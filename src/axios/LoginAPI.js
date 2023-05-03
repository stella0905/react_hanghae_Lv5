import axios from "axios";
import Cookies from "js-cookie";


const instance = axios.create({
  baseURL: process.env.REACT_APP_LOGIN_SERVER_URL
})

//회원가입 API
const handleSignUp = async (props) => {
  try {
    const response = await instance.post(`/register`, {
      id: props.id,
      password: props.password
    })
    return response.data
  }
  catch (error) {
    if (error.response.status !== 201) {
      return error.response.data
    }
    throw new Error('회원가입 실패 ')
  }
}

//로그인 API
const handleLogin = async (props) => {
  try {
    const response = await instance.post(`/login`, {
      id: props.id,
      password: props.password
    })
    return response.data
  }
  catch (error) {
    if (error.response.status !== 201) {
      return error.response.data
    }
  }
  // throw new Error(error.message)
}

//인가 API
const getLoginData = async () => {
  const accessToken = Cookies.get('token');
  const response = await instance.get(`/user`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    }
  })

  return response
}
export { handleSignUp, handleLogin, getLoginData }