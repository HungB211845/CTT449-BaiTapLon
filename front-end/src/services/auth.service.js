import api from '@/api';

class AuthService {
  /**
   * Login user
   * @param {string} HoTenNV - Username
   * @param {string} Password - Password
   * @returns {Promise} Promise with login response
   */
  async login(HoTenNV, Password) {
    const response = await api.post('/auth/login', { HoTenNV, Password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      // Parse JWT to get user info (without using external library)
      try {
        const base64Url = response.data.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const payload = JSON.parse(jsonPayload);
        localStorage.setItem('user', JSON.stringify({
          id: payload.id,
          chucvu: payload.ChucVu,
        }));
      } catch (e) {
        console.error('Error parsing JWT', e);
      }
    }
    return response.data;
  }

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Promise with registration response
   */
  async register(userData) {
    return api.post('/auth/register', userData);
  }

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Get current user
   * @returns {Object|null} Current user or null if not logged in
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Check if user is logged in
   * @returns {boolean} Whether user is logged in
   */
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean} Whether user has the role
   */
  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.chucvu === role;
  }
}

export default new AuthService();
