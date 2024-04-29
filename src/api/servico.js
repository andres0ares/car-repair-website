import { useAppStore } from "@/store/app";
import { getAllDefault, createDeafult, editDefault } from "./default";
import axios from "axios";

export function getServicos() {
  const store = useAppStore(); //get rmas' store
  
  const server_uri = import.meta.env.VITE_SERVER_URI;

  store.resetServicos(); 

  //send request
  axios
    .get(`${server_uri}/api/servico/all`)
    .then((res) => {
      //save updated rmas
      store.setServicos(res.data.reverse(), 'ready');
    })
    .catch((err) => {
      console.log("error: ", err);
      //if error, update status to 'error'
      store.setServicos([], 'error');
    });
}


export function getAll() {
  return getAllDefault('/api/servico/all')
}

export function create(_) {
  return createDeafult(_, '/api/servico')
}

export function edit(_) {
  return editDefault(_, '/api/servico')
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