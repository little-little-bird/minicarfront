import axios from './axios.js'

export const get_qr_code = () => axios.get("http://localhost:8080/library/system/user/qr-code", {showLoading: true})