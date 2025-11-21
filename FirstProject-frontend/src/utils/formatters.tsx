
export const formatDate = (isoString: string) => {
  return isoString.split("T")[0];
};

export const normalizePhone = (phone: string) => {
  if (!phone) return "";

  let cleaned = phone.replace(/[^\d]/g, "");

  if (cleaned.startsWith("40") && cleaned.length === 11) {
    cleaned = "0" + cleaned.slice(2);
  }

  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }

  return phone;
};