import axios from "axios";

const instance = axios.create({
  baseURL: 'https://laravel-testdeploy.herokuapp.com/api/', // test deploy api
});
const Api = {
  getData: (location) =>
    instance({
      method: "GET",
      url: location,
      params: {        
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
      },
    }),
  deleteData: (location) =>
    instance({
      method: "DELETE",
      url: location,
      params: {
      },
    }),
};

export default Api;
