import axios from "axios";

export const getUserByNameSpec = async (name: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5201/api/userSpec/get-by-name-spec?name=${name}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with name ${name}:`, error);
    throw error;
  }
};

export const getUserByAgeSpec = async (age: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5201/api/userSpec/get-by-age-spec?age=${age}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with age ${age}:`, error);
    throw error;
  }
};
