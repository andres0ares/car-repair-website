import { useAppStore } from "@/store/app";
import axios from "axios";

export function getAllDefault(_route) {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;
    //send request
    axios
      .get(`${server_uri}${_route}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject()
      });
  })
}

export function getDefault(_id, route) {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;
    //send request
    axios
      .get(`${server_uri}${route}${_id}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject()
      });
  })
}


export function createDeafult(_, _route) {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;
    console.log(_)
    axios
      .post(`${server_uri}${_route}`, _)
      .then((_e) => {
        resolve(true)
      })
      .catch((_) => {
        reject()
      })
    })
}

export function editDefault(_, _route) {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;
    console.log(_)
    axios
      .put(`${server_uri}${_route}`, _)
      .then((_e) => {
        console.log('heree')
        resolve(true)
      })
      .catch((_) => {
        console.log(_)
        reject()
      })
    })
}

export function deleteDefault(id, _route) {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;

    axios
      .delete(`${server_uri}${_route}${id}`)
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