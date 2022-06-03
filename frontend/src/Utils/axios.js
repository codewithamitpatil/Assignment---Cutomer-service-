import axios from "axios";

const base_url = "http://localhost:5000";

export const http = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});
