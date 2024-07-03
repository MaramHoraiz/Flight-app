import axios from "axios";
import AuthService from "./AuthService";

class FlightService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": " application/json",
      },
    });

    // Attach the token to every request
    this.api.interceptors.request.use((config) => {
      const { token } = AuthService.getCurrentUser();
      if (token) {
        config.headers["Authorization"] = `${token}`;
      }
      return config;
    });

    // Handle responses
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          AuthService.logout();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  async getFlights(page, size) {
    try {
      const response = await this.api.get("/flights", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch flights"
      );
    }
  }

  async addFlight(formData) {
    try {
      const response = await this.api.post(
        "/flights",
        JSON.stringify(formData),
        {}
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateFlight(flightId, formData) {
    try {
      const response = await this.api.put(`/flights/${flightId}`, formData, {});
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteFlight(flightId) {
    try {
      await this.api.delete(`/flights/${flightId}`);
    } catch (error) {
      throw error;
    }
  }

  async addFlightWithPhoto(formData) {
    try {
      const response = await this.api.post(
        "/flights/withPhoto",
        JSON.stringify(formData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new FlightService("http://localhost:3000");
