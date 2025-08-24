export const isNotNullOrEmptyArray = (data) => {
  return data && Array.isArray(data) && data.length > 0;
};
