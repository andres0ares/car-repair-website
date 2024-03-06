import { useAppStore } from "@/store/app";
import axios from "axios";

export function getCars() {
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