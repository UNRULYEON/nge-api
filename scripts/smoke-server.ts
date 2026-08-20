if (!(await Bun.file("./server").exists())) {
  throw new Error("Missing ./server. Run bun run build first.");
}

const port = process.env.PORT ?? "34567";
const baseUrl = `http://127.0.0.1:${port}`;

const server = Bun.spawn(["./server"], {
  cwd: process.cwd(),
  env: { ...process.env, PORT: port, NODE_ENV: "production" },
  stdout: "inherit",
  stderr: "inherit",
});

const shutdown = async () => {
  server.kill();
  await server.exited;
};

const waitForReady = async () => {
  const deadline = Date.now() + 15_000;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Server exited early (${server.exitCode})`);
    }

    try {
      const response = await fetch(`${baseUrl}/health`, { signal: AbortSignal.timeout(500) });
      if (response.ok) {
        return;
      }
    } catch {
      await Bun.sleep(50);
    }
  }

  throw new Error("Server did not become ready in time");
};

try {
  await waitForReady();

  const health = await fetch(`${baseUrl}/health`, { signal: AbortSignal.timeout(3000) });
  if (!health.ok || (await health.text()) !== "OK") {
    throw new Error(`Health check failed: ${health.status}`);
  }

  const studios = await fetch(`${baseUrl}/v1/studios`, { signal: AbortSignal.timeout(3000) });
  if (!studios.ok) {
    throw new Error(`Studios check failed: ${studios.status}`);
  }

  const studioList = (await studios.json()) as unknown[];
  if (!Array.isArray(studioList) || studioList.length === 0) {
    throw new Error("Studios check returned no rows; migrate/seed likely failed");
  }

  const favicon = await fetch(`${baseUrl}/public/favicon.svg`, {
    signal: AbortSignal.timeout(3000),
  });
  if (!favicon.ok) {
    throw new Error(`Favicon check failed: ${favicon.status}`);
  }

  const spec = await fetch(`${baseUrl}/openapi.json`, { signal: AbortSignal.timeout(3000) });
  if (!spec.ok) {
    throw new Error(`OpenAPI check failed: ${spec.status}`);
  }

  console.log(`smoke: ok (health, ${studioList.length} studios, favicon, openapi) on ${baseUrl}`);
} finally {
  await shutdown();
}
