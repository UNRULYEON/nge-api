export const jsonResult = <T extends Record<string, unknown>>(value: T) => ({
  content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
  structuredContent: value,
});

export const missingResult = (kind: string, id: string) => ({
  content: [{ type: "text" as const, text: `No ${kind} found with id "${id}".` }],
  isError: true as const,
});

export const jsonResource = (uri: URL, value: unknown) => ({
  contents: [
    {
      uri: uri.href,
      mimeType: "application/json",
      text: JSON.stringify(value, null, 2),
    },
  ],
});
