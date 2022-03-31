import axios from "axios";

const instance = axios.create({
  url: 'https://randomuser.me/'
})

export default instance;
