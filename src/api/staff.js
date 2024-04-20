import { useAppStore } from "@/store/app";
import { createDeafult, editDefault, deleteDefault, getDefault, getAllDefault} from "@/api/default"
import axios from "axios";

export function getAll() {
    return getAllDefault('/api/funcionario/all')
}

export function create(_staff) {
  return createDeafult(_staff, '/api/funcionario')
}

export function edit(_staff) {
    console.log(_staff)
  return editDefault(_staff, '/api/funcionario')
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