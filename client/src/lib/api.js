import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export async function fetchWhatsAppLink() {
  const { data } = await api.get('/whatsapp-link');
  return data;
}

export async function sendContact(payload) {
  const { data } = await api.post('/contact', payload);
  return data;
}

export async function requestCallback(payload) {
  const { data } = await api.post('/callback', payload);
  return data;
}

export default api;