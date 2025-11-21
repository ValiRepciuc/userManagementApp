import axios from "axios";

export const getUsersOrderByName = async (name: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5201/api/userSpec/sortAll-by-name-spec?name=${name}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users sorted by name:", error);
    throw error;
  }
};

export const getUsersOrderDescByName = async (name: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5201/api/userSpec/sortAll-desc-by-name-spec?name=${name}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users sorted by name:", error);
    throw error;
  }
};

export const getAllUsersOrderByName = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5201/api/userSpec/sortAll-by-name"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users sorted by name:", error);
    throw error;
  }
};

export const getAllUsersOrderDescByName = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5201/api/userSpec/sortAll-desc-by-name"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users sorted by name descending:", error);
    throw error;
  }
};