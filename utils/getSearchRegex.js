exports.getSearchRegexp = async (value) => {
  if (value.toString().startsWith("+")) {
    return value.slice(1);
  }
  const result = { $regex: ".*" + value.trim() + ".*", $options: "i" };
  return result;
};
