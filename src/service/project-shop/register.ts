import { ServiceResponse } from "constants/serviceResponse";
import RegisterRequest from '../../model/register/request/registerRequest'
import AxiosHttpServer from '../../server/http/index'

class RegisterService {
    public rtgister(request: RegisterRequest): ServiceResponse<any> {
        return AxiosHttpServer.axios.post('/register', request)
    }
}

export default RegisterService