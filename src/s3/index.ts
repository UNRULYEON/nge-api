/* v8 ignore start */

import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.DO_ACCESS_KEY) {
  throw new Error('"DO_ACCESS_KEY" is not defined');
}

if (!process.env.DO_SECRET_KEY) {
  throw new Error('"DO_SECRET_KEY" is not defined');
}

const s3Client = new S3Client({
  endpoint: "https://ams3.digitaloceanspaces.com",
  forcePathStyle: false,
  region: "ams3",
  credentials: {
    accessKeyId: process.env.DO_ACCESS_KEY,
    secretAccessKey: process.env.DO_SECRET_KEY,
  },
});

export { s3Client };

/* v8 ignore stop */
