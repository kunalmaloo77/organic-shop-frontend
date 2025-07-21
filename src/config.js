const backendUrl = import.meta.env.DEV
  ? import.meta.env.VITE_BACKEND_URL_DEVELOPMENT
  : import.meta.env.VITE_BACKEND_URL_PRODUCTION;

export default backendUrl;
