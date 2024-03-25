import Axios from "axios";
import { REACT_APP_HOME_URL } from "../constants/api";

export const axios = Axios.create({
  baseURL: REACT_APP_HOME_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
