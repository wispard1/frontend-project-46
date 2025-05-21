import plain from '../formatters/plain.js';
import stylish from '../formatters/stylish.js';

const formatters = {
  stylish,
  plain,
};

const formatData = (obj1, obj2, format = 'stylish') => {
  const formatter = formatters[format];

  if (!formatter) {
    throw new Error(`Unknown format: ${format}`);
  }

  return formatter(obj1, obj2);
};

export default formatData;
