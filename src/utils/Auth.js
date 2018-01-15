export default class Auth {
  static authenticateUser(tokens) {
    localStorage.setItem('tokens', tokens);
  }
  static isUserAuthenticated() {
    return localStorage.getItem('tokens') !== null;
  }
  static deauthenticateUser() {
    localStorage.removeItem('tokens');
  }
  static getToken() {
    return localStorage.getItem('tokens');
  }
}
