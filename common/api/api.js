import axios from './axios.js'

export const get_qr_code = () => axios.get("https://chengym.com.cn/library/system/user/qr-code", {showLoading: true})