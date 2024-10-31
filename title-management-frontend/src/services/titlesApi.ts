import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

interface TitleResponse {
  title: string;
  createdAt: string;
  uuid: string;
}

const titlesApi = {
  createTitle: async (title: string): Promise<TitleResponse> => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post<TitleResponse>(
        `${API_BASE_URL}/title`,
        { title },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },

  getTitles: async (): Promise<TitleResponse[]> => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get<TitleResponse[]>(
        `${API_BASE_URL}/title`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : new Error("Network error");
    }
  },
};

export default titlesApi;
