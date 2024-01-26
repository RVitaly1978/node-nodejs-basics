import path from 'node:path';
import { fileURLToPath } from 'url';

export const getFileName = (url) => {
  return fileURLToPath(url);
}

export const getDirName = (url) => {
  return path.dirname(getFileName(url));
}

export const getPath = (url, segments = []) => {
  return path.join(getDirName(url), ...segments);
}

export const throwError = (msg = 'FS operation failed') => {
  throw new Error(msg);
}
