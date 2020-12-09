import axios from './axios.js'

// export const get_qr_code = () => axios.get("http://localhost:8080/minicar/system/user/qr-code", {showLoading: true})
export const get_qr_code = () => axios.get("https://chengym.com.cn/minicar/system/user/qr-code", {showLoading: true})
export const get_order_records = () => axios.get("https://chengym.com.cn/minicar/order/own/list", {showLoading: true})
export const get_inviter_records = () => axios.get("https://chengym.com.cn/minicar/system/user/inviter/list", {showLoading: true})