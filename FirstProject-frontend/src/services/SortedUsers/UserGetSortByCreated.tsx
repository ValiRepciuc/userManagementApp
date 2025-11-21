import axios from "axios";

export const getAllUsersOrderByCreated = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5201/api/userSpec/sortAll-by-created"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users sorted by created date:", error);
    throw error;
  }
};

export const getAllUsersOrderDescByCreated = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5201/api/userSpec/sortAll-desc-by-created"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users sorted by created date:", error);
    throw error;
  }
};
