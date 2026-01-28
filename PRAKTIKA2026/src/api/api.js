import axios from 'axios';  // Добавьте import

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Customer API методы
export const customerApi = {
  getAll: () => api.get('/customers'),
  getFiltered: (params) => api.get('/customers/filter', { params }),
  getById: (code) => api.get(`/customers/${code}`),
  create: (customer) => api.post('/customers', customer),
  update: (code, customer) => api.put(`/customers/${code}`, customer),
  delete: (code) => api.delete(`/customers/${code}`),
};

// Lot API методы
export const lotApi = {
  getAll: () => api.get('/lots'),
  create: (lot) => api.post('/lots', lot),
};