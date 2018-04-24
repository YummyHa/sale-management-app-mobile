import axios from 'axios'

export const fetchProducts = () =>
  axios.get('http://localhost:3000/api/products')
    .then(res => res.data);
