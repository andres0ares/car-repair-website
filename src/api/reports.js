import axios from "axios";

export function getReportList() {
  return new Promise((resolve, reject) => {
    const server_uri = import.meta.env.VITE_SERVER_URI;

    //send request
    axios
    .get(`${server_uri}/api/report/list`)
    .then((res) => {
        resolve(res.data)
    })
    .catch((err) => {
        reject()
    });
  })
}

export function getReport(_option) {
    return new Promise((resolve, reject) => {
      const server_uri = import.meta.env.VITE_SERVER_URI;
  
      //send request
      axios
      .get(`${server_uri}/api/report/${_option}`)
      .then((res) => {
          resolve(res.data)
      })
      .catch((err) => {
          reject()
      });
    })
  }