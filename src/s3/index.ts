import * as Minio from 'minio'

if (!process.env.MINIO_ENDPOINT) {
  throw new Error('"MINIO_ENDPOINT" is not defined')
}

if (!process.env.MINIO_PORT) {
  throw new Error('"MINIO_PORT" is not defined')
}

if (!process.env.MINIO_ACCESS_KEY) {
  throw new Error('"MINIO_ACCESS_KEY" is not defined')
}

if (!process.env.MINIO_SECRET_KEY) {
  throw new Error('"MINIO_SECRET_KEY" is not defined')
}

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
})

export { minioClient };