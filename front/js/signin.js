import API from './services/storage.js';
import Auth from './services/auth.js';

const loginForm = document.getElementById('loginForm');

loginForm.onsubmit = async (event) => {
  event.preventDefault();

  if (loginForm.checkValidity()) {
    const user = {
      email: loginForm.email.value,
      password: loginForm.password.value,
    };

    try {
      const { auth, token } = await API.create('signin', user, false);

      if (auth) {
        Auth.signin(token);
      } else {
        alert('Erro ao fazer login'); // Exibe uma mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login'); // Exibe uma mensagem de erro
    }
  } else {
    loginForm.classList.add('was-validated');
  }
};

// Adiciona eventos de validação, assim como no código do cadastro
const inputs = [loginForm.email, loginForm.password];

inputs.forEach((input) => {
  input.addEventListener('input', () => {
    input.setCustomValidity('');
    loginForm.classList.remove('was-validated');
  });
});