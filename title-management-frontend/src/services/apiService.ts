import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1/auth";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface User {
  username: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  uuid: string;
}

interface RegisterResponse {
  user: User;
}

const apiService = {
  register: async (userData: RegisterData): Promise<RegisterResponse> => {
    try {
      const response = await axios.post<RegisterResponse>(
        `${API_BASE_URL}/register`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },
};

export default apiService;
