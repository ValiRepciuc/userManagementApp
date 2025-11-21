export const parseApiError = (err: any): string => {
  const data = err?.response?.data;

  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  if (data?.detail) {
    return data.detail;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.errors) {
    const first = Object.values(data.errors)[0];
    if (Array.isArray(first)) return first[0];
  }

  return err?.message || "Unexpected error occurred.";
};
