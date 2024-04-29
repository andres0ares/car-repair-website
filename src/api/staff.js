import { useUserStore } from "@/store/user";
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


export function loginStaff(_login) {
  return new Promise((resolve, reject) => {

      const server_uri = import.meta.env.VITE_SERVER_URI;

      //send request
      axios
      .post(`${server_uri}/api/funcionario/login`, _login)
      .then((res) => {
          //save updated rmas
          const user = useUserStore(); //
          user.loginStaff(res.data);
          resolve(true)
      })
      .catch((err) => {
          console.log(err)
          reject()
      });
  })
}