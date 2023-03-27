export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item.value ? item.value : "",
    };
  }, initialValue);
};

export const convertArrayToObjectValue = (array, key, value) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item[value],
    };
  }, initialValue);
};
