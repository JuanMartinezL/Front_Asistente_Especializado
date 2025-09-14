import axios from 'axios';

const API_URL = 'https://tu-api.com/usuario/1'; // Reemplaza con la URL de la API

export const obtenerPerfilDeUsuario = async () => {
  const respuesta = await axios.get(API_URL);
  return respuesta.data; // Axios ya convierte el JSON
};