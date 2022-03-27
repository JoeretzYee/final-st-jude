import axios from "axios";

const instance = axios.create({
  baseURL: "https://final-st-jude.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
  },
});
export default instance;

// http://127.0.0.1:8000
