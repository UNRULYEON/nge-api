import { DEFAULT_LIMIT } from "@/shared/pagination";

export const missingId = "00000000-0000-0000-0000-000000000000";

export const page = <T>(data: T[], total = data.length, limit = DEFAULT_LIMIT, offset = 0) => ({
  data,
  meta: { total, limit, offset },
});
