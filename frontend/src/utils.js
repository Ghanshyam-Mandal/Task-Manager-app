import { toast } from 'react-toastify';
export const notify = (message, type = 'default') => {
  toast[type](message);
};
export const API_URL = 'http://localhost:5000';
