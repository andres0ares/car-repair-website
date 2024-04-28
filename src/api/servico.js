import { getAllDefault, createDeafult, editDefault } from "./default";
import axios from "axios";

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