// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust to your API's URL

class AuthService {
  login(email, password) {
    return axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
   isTokenExpired(token) {
    if (!token) return true;
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  logout() {
    localStorage.removeItem('user');
  }

  register(name, email, password) {
    return axios.post(`${API_URL}/auth/register`, { name, email, password });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  async refreshToken() {
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.refreshToken) {
      this.logout();
      return;
    }
    
    try {
      const response = await this.api.post('/refresh', {
        refreshToken: currentUser.refreshToken,
      });
      const newUserData = {
        ...currentUser,
        token: response.data.token,
      };
      localStorage.setItem('user', JSON.stringify(newUserData));
      return newUserData;
    } catch (error) {
      this.logout();
      throw error;
    }
  }
   isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token && !this.isTokenExpired(user.token);
  }
}

export default new AuthService();
