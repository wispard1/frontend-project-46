import { parse } from 'yaml';

export default function parser(data, ext) {
  try {
    switch (ext) {
      case 'json':
        return JSON.parse(data);
      case 'yaml':
      case 'yml':
        return parse(data);

      default:
        throw new Error(`Unsupported file extension '${ext}'`);
    }
  } catch (error) {
    throw new Error(`Error parsing ${ext} file: ${error.message}`);
  }
}
