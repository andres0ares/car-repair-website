import { useAppStore } from "@/store/app";
import axios from "axios";

export function getAll() {
  const store = useAppStore(); //get rmas' store
  
  const server_uri = import.meta.env.VITE_SERVER_URI;

  store.resetCars(); //reset store, all rmas are deleted

  //send request
  axios
    .get(`${server_uri}/api/cars`)
    .then((res) => {
      //save updated rmas
      store.setCars(res.data.reverse(), 'ready');
    })
    .catch((err) => {
      console.log("error: ", err);
      //if error, update status to 'error'
      store.setCars([], 'error');
    });
}

export function get(_id) {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;
    //send request
    axios
      .get(`${server_uri}/api/car/${_id}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject()
      });
  })
}


export function create(_car) {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;

    axios
      .post(`${server_uri}/api/car`, _car)
      .then((_e) => {
        resolve(true)
      })
      .catch((_) => {
        reject()
      })
    })
}

export function edit(_car) {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;

    axios
      .put(`${server_uri}/api/car`, _car)
      .then((_e) => {
        resolve(true)
      })
      .catch((_) => {
        reject()
      })
    })
}

export function del(id) {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;

    axios
      .delete(`${server_uri}/api/car/${id}`)
      .then((_e) => {
        resolve(true)
      })
      .catch((_) => {
        reject()
      })
    })
}

export function search(_nome) {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;

    axios
      .get(`${server_uri}/api/car/search/${_nome}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((_) => {
        reject()
      })
    })
}