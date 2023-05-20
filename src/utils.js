import axios from "axios";

export const getAllCategories = () => {
  return axios
    .get("https://fakestoreapi.com/products/categories")
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const loginUser = ({ username, password }) => {
  return axios
    .post("https://fakestoreapi.com/auth/login", {
      username: "mor_2314",
      password: "83r5^_",
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const postLogin = ({ username, password, name }) => {
  return fetch("https://fakestoreapi.com/users", {
    method: "POST",
    body: JSON.stringify({
      email: username,
      username: name,
      password: password,
      name: {
        firstname: name,
        lastname: name,
      },
      address: {
        city: "kilcoole",
        street: "7835 new road",
        number: 3,
        zipcode: "12926-3874",
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: "1-570-236-7033",
    }),
  })
    .then((res) => res.json())
    .then((json) => json);
};

export const getAllProduct = (params) => {
  return fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => json);
};

export const getAllProductForCat = (category) => {
  return fetch("https://fakestoreapi.com/products/category/" + category)
    .then((res) => res.json())
    .then((json) => json);
};

export const getLimitResult = (limit) => {
  return fetch("https://fakestoreapi.com/products?limit=" + limit)
    .then((res) => res.json())
    .then((json) => json);
};

export const getProductId = (id) => {
  return fetch("https://fakestoreapi.com/products/" + id)
    .then((res) => res.json())
    .then((json) => json);
};

export const getSorted = (sort) => {
  return fetch('https://fakestoreapi.com/products?sort='+sort)
  .then(res=>res.json())
  .then(json=> (json))
};
