export const isNotNullOrEmptyArray = (data) => {
  return data && Array.isArray(data) && data.length > 0;
};

// Format date to readable string
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
