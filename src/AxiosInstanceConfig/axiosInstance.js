
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/user', // Replace with your API base URL
});

// Add a request interceptor to attach the Authorization header with the JWT token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }else{
        console.log('invalid token')
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors and token expiration
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Unauthorized (JWT token expired or invalid)
      if (status === 401) {
        // Handle token expiration or invalid token
        console.log('JWT token expired or invalid');
        // You can redirect to the login page or perform any other actions
      }

      // Forbidden (Not authorized)
      if (status === 403) {
        // Handle unauthorized access
        console.log('Not authorized');
        // You can redirect to a forbidden page or perform any other actions
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.log('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error:', error.message);
    }

    // Check for specific error message indicating missing token
    if (error.message.includes('missing part #2')) {
      // Handle missing or cleared token
      console.log('JWT token is missing or cleared');
      // You can redirect to the login page or perform any other actions
    }

    return Promise.reject(error);
  }
);

export default instance;

