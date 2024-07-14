import * as Minio from 'minio';
import { MINIO_ACCESS_KEY, MINIO_ENDPOINT, MINIO_SECRET_KEY } from '$env/static/private';

export const minio = new Minio.Client({
  endPoint: MINIO_ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY
});
