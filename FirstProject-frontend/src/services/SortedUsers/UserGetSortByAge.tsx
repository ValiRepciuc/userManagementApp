import axios from "axios";

export const getAllUsersOrderByAge = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5201/api/userSpec/sortAll-by-age`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users sorted by age:", error);
    throw error;
  }
};

export const getAllUsersOrderDescByAge = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5201/api/userSpec/sortAll-desc-by-age`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users sorted by age:", error);
    throw error;
  }
};
