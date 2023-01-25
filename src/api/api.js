import axios from "axios";

const api_key = "21bb59000f4e43279f552821232501"
const host = `http://api.weatherapi.com/v1/`

export const getCurrent = async (city) => {
    return await axios.get(`${host}current.json?key=${api_key}&q=${city}`)
}

export const search = async (query) => {
    return await axios.get(`${host}search.json?key=${api_key}&q=${query}`)
}