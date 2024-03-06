import { useAppStore } from "@/store/app";
import axios from "axios";

export function getCars() {
    const store = useAppStore(); //get rmas' store
    
    const server_uri = import.meta.env.VITE_SERVER_URI;

    store.resetCars(); //reset store, all rmas are deleted
  
    // const user_id = user.getClientId; //get user_id
  
    // const config = {
    //   headers: { Authorization: `Bearer ${user.access_token}` }, //get acces_token
    // };
  
    //send request
    axios
      .get(`${server_uri}/api/cars`)
      .then((res) => {
        //save updated rmas
        console.log(res.data)
        store.setCars(res.data.reverse(), 'ready');
      })
      .catch((err) => {
        console.log("error: ", err);
        //if error, update status to 'error'
        store.setCars([], 'error');
      });
  }