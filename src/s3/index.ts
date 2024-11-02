/* v8 ignore start */

import {
  S3Client as AWSS3Client,
  PutObjectCommand,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import type { ReadStream } from "fs";

if (!process.env.DO_ACCESS_KEY) {
  throw new Error('"DO_ACCESS_KEY" is not defined');
}

if (!process.env.DO_SECRET_KEY) {
  throw new Error('"DO_SECRET_KEY" is not defined');
}

class S3Client {
  #client: AWSS3Client;
  #bucketName: string = "nge-api";

  constructor() {
    this.#client = new AWSS3Client({
      endpoint: "https://ams3.digitaloceanspaces.com",
      forcePathStyle: false,
      region: "ams3",
      credentials: {
        accessKeyId: process.env.DO_ACCESS_KEY,
        secretAccessKey: process.env.DO_SECRET_KEY,
      },
    });
  }

  async uploadImage({
    key,
    file,
    size,
  }: {
    key: string;
    file: ReadStream;
    size: number;
  }) {
    const params: PutObjectCommandInput = {
      Bucket: this.#bucketName,
      Key: key,
      Body: file,
      ACL: "public-read",
      ContentLength: size,
      ContentType: "image/jpg",
    };

    return await this.#client.send(new PutObjectCommand({ ...params }));
  }
}

const s3Client = new S3Client();

export { s3Client };

/* v8 ignore stop */
