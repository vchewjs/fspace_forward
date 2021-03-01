//判断非空
function isNotNull(str) {
  return str && str !== "null";
}

/* 对象转json字符串 */
function convertString(obj) {
  if (obj && typeof obj === "object") {
    return JSON.stringify(obj);
  }
  return obj;
}

module.exports = {
  isNotNull,
  convertString
}