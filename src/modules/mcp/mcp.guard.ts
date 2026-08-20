import {
  hostHeaderValidationResponse,
  localhostAllowedHostnames,
  localhostAllowedOrigins,
  originValidationResponse,
  validateHostHeader,
} from "@modelcontextprotocol/server";

/**
 * Streamable HTTP DNS-rebinding guards from the 2026-07-28 spec and the
 * TypeScript SDK HTTP serving guide.
 *
 * Localhost Host values require a localhost Origin (or none). Public Host
 * values allow any well-formed Origin so remote MCP clients and browser
 * inspectors can connect; missing Origin always passes.
 *
 * Fetch `Request` objects often omit the Host header (it is forbidden in
 * browsers). Fall back to the request URL host in that case so in-process
 * clients and `app.handle()` tests still classify localhost vs public.
 */
export const mcpGuardResponse = (request: Request): Response | undefined => {
  const localHosts = localhostAllowedHostnames();
  const hostHeader = request.headers.get("host") ?? new URL(request.url).host;

  if (!hostHeader) {
    return hostHeaderValidationResponse(request, localHosts);
  }

  const localHost = validateHostHeader(hostHeader, localHosts);
  if (localHost.ok) {
    return originValidationResponse(request, localhostAllowedOrigins());
  }

  const origin = request.headers.get("origin");
  if (origin === null || origin === "") {
    return undefined;
  }

  try {
    const originHostname = new URL(origin).hostname;
    if (originHostname === "") {
      return originValidationResponse(request, []);
    }

    return originValidationResponse(request, [originHostname]);
  } catch {
    return originValidationResponse(request, []);
  }
};
