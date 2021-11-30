import { ServiceResponse } from "../../constants/serviceResponse"
import LoginRequest from "../../model/login/loginRequest"
import AxiosHttpServer from '../../server/http/index'
import UserAuth from '../../model/login/response/userAuth'

class LoginService {

    public login(logIn: LoginRequest): ServiceResponse<UserAuth> {
        return AxiosHttpServer.axios.post('/login', logIn)
    }
}

export default LoginService