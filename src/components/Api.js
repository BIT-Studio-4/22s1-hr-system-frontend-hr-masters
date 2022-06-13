import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL, // test deploy api
});
const Api = {
  getData: (location) =>
    instance({
      method: "GET",
      url: location,
      params: {        
      },
      headers: {
        "content-type": "application/json", // override instance defaults
        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
      },
    }),
  postData: (location, sendData) =>
    instance({
      method: "POST",
      url: location,
      params: {
      },
      data: sendData,
      headers: {
        "content-type": "application/json", // override instance defaults
        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
      },
    }),
  putData: (location, sendData) =>
    instance({
      method: "PUT",
      url: location,
      params: {
      },
      data: sendData,
      headers: {
        "content-type": "application/json", // override instance defaults
        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
      },
    }),
  deleteData: (location) =>
    instance({
      method: "DELETE",
      url: location,
      params: {
      },
      headers: {
        "content-type": "application/json", // override instance defaults
        Authorization: `Bearer ${sessionStorage.getItem('auth_token')}`,
      },
    }),
};

export default Api;
