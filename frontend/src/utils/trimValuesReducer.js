export default function trimValuesReducer(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = typeof value === 'string' ? value.trim() : value;
    return acc;
  }, {});
}
