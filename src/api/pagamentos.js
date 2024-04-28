import { useAppStore } from "@/store/app";
import axios from "axios";

export function getPagamentos() {
  const store = useAppStore(); //get store
  
  const server_uri = import.meta.env.VITE_SERVER_URI;

  store.resetPagamentos(); //reset pagamentos stored

  //send request
  axios
    .get(`${server_uri}/api/pagamento`)
    .then((res) => {
      //save updated rmas
      store.setPagamentos(res.data, 'ready');
      console.log(res.data)
    })
    .catch((err) => {
      console.log("error: ", err);
      //if error, update status to 'error'
      store.setPagamentos([], 'error');
    });
}