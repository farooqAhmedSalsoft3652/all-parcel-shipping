import axios from "axios";
import { decode } from "base-64";

// axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.baseURL = "https://dev74.onlinetestingserver.com/acolai/api";

let user = decode(localStorage.getItem('user'));
let token = decode(localStorage.getItem('_token'));

if(user && token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;