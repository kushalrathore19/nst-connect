import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nst-backend-blw1.onrender.com/api', 
});

//  SECURITY UPGRADE: Automatically attach the JWT token to every request
api.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

//  NEW: Login API call to get the token
export const loginAdmin = (password) => api.post('/auth/login', { password });

export const getFaqs = (category) => {
  const url = category && category !== 'All' ? `/faqs?category=${category}` : '/faqs';
  return api.get(url);
};

export const createFaq = (faqData) => api.post('/faqs', faqData);
export const getStudents = () => api.get('/students');
export const getQueries = () => api.get('/queries');
export const createQuery = (queryData) => api.post('/queries', queryData);

// Status and Approval Updates
export const updateQueryStatus = (id, status) => api.patch(`/queries/${id}/status`, { status });
export const createStudent = (studentData) => api.post('/students', studentData);

// Mentor Approval Functions
export const getPendingStudents = () => api.get('/students/pending');
export const approveStudent = (id) => api.patch(`/students/${id}/approve`);

// God Mode Delete Functions
export const deleteFaq = (id) => api.delete(`/faqs/${id}`);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
export const deleteQuery = (id) => api.delete(`/queries/${id}`);

export default api;