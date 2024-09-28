function isAuthenticated() {
    if (!getToken()) {
      window.location.href = '/front/login.html';
    } else {
      return true;
    }
  }
   
  function getToken() {
    return localStorage.getItem('@ticket:token');
  }
   
  function signin(token) {
    localStorage.setItem('@ticket:token', token);
    window.location.href = '/front/index.html';
  }
   
  function signout() {
    localStorage.removeItem('@ticket:token');
   
    window.location.href = '/front/login.html';
  }
   
  export default { isAuthenticated, getToken, signin, signout };
   