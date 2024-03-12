import { useUserStore } from "@/store/user";
import axios from "axios";

export function loginClient(_login) {
    return new Promise((resolve, reject) => {

        const server_uri = import.meta.env.VITE_SERVER_URI;

        //send request
        axios
        .post(`${server_uri}/api/client/login`, _login)
        .then((res) => {
            //save updated rmas
            const user = useUserStore(); //get rmas' store
            user.loginClient(res.data);
            resolve(true)
        })
        .catch((err) => {
            reject()
        });
    })
}

export function createClient(_client) {
    return new Promise((resolve, reject) => {

        const server_uri = import.meta.env.VITE_SERVER_URI;
        console.log(_client)

        //send request
        axios
        .post(`${server_uri}/api/client`, _client)
        .then((res) => {
            //save updated rmas
            const user = useUserStore(); //get rmas' store

            delete _client.senha

            user.loginClient(_client);
            resolve(true)
        })
        .catch((err) => {
            reject()
        });
    })
}