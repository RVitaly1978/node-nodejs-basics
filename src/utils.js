import path from 'node:path';
import { fileURLToPath } from 'url';

export const getDirName = (url) => {
  const __filename = fileURLToPath(url);
  return path.dirname(__filename);
}

export const getPath = (url, segments = []) => {
  return path.join(getDirName(url), ...segments);
}

export const throwError = (msg = 'FS operation failed') => {
  throw new Error(msg);
}
