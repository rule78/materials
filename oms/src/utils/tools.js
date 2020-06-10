export function ObjectDeleteAttr(obj) {
  const validObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== '' && obj[key] !== null) {
      validObj[key] = obj[key];
    }
  });
  return validObj;
}
export default {};
