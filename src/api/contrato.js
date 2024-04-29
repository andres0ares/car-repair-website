import { getAllDefault, createDeafult, editDefault } from "./default";
import axios from "axios";

export function create(_) {
  return createDeafult(_, '/api/contrato')
}

export function getAllByClient(id) {

  const server_uri = import.meta.env.VITE_SERVER_URI;

  return new Promise((resolve, reject) => {
    axios.get(`${server_uri}/api/contrato/${id}`)
    .then((_) => {
      resolve(_.data)
    })
    .catch((_) => {
      reject(_)
    })
  })
}

export function getContratosPendentes() {
  return getAllDefault(`/api/contrato/status/0`)
}

export function getContratosFuncionario(id) {
  return getAllDefault(`/api/contrato/funcionario/${id}`)
}

export function getContratosAtendimento() {
  return getAllDefault(`/api/atendimentos/contrato`)
}

export function aproveContrato(id, _id) {
  return editDefault({ contrato_id: id, funcionario_id: _id }, '/api/contrato/status')
}

export function getAllAtendimentos() {
  return getAllDefault(`/api/atendimentos/format`)
}