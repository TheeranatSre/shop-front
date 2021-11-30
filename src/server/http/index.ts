import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class AxiosHttpServer {
    public static axios: AxiosInstance = AxiosHttpServer.create()

    private static create(): AxiosInstance {
        const axios: AxiosInstance = Axios.create({
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })

        axios.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
              config.baseURL = 'http://localhost:8080/'
              config.headers['x-api-key'] = ''
              return config
            },
            (response: Response) => {
              return response
            }
          )

        return axios
    }
}

export default AxiosHttpServer