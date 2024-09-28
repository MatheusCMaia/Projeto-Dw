import Auth from './auth.js';

const API_URL = 'http://127.0.0.1:3000';

async function create(resource, data, auth = true) {
  resource = `${API_URL}/${resource}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  };

  if (auth) {
    config.headers.Authorization = `Bearer ${Auth.getToken()}`;
  }

  const res = await fetch(resource, config);
  
  // Verifique se a resposta é OK antes de tentar fazer o parse
  if (!res.ok) {
    const errorText = await res.text(); // Para obter a mensagem de erro
    throw new Error(`Erro: ${res.status} - ${errorText}`); // Lança um erro com o status e a mensagem
  }

  const createdData = await res.json();
  
  return createdData;
}

async function read(resource) {
  resource = `${API_URL}/${resource}`;

  const config = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  };

  const res = await fetch(resource, config);

  if (!res.ok) {
    const errorText = await res.text(); // Para obter a mensagem de erro
    throw new Error(`Erro: ${res.status} - ${errorText}`);
  }

  const data = await res.json();

  return data;
}

async function update(resource, data) {
  resource = `${API_URL}/${resource}`;

  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Auth.getToken()}`,
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(resource, config);

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro: ${res.status} - ${errorText}`);
  }

  const updatedData = await res.json();

  return updatedData;
}

async function remove(resource) {
  resource = `${API_URL}/${resource}`;

  const config = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  };

  const res = await fetch(resource, config);

  return res.ok;
}

export default { create, read, update, remove };
