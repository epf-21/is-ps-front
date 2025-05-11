import axios from "axios";
import { API_URL } from "@/utils/bakend";

const apiAllCards = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const apiCarById = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export { apiAllCards, apiCarById };