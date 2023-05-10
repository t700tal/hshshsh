import axios from "axios"

export const initiateAxios = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL
}
