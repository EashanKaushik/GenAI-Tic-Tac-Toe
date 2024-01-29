import axios, { AxiosError, CanceledError } from "axios";
import awsExports from "./aws-exports"

export {CanceledError, AxiosError};
export default () => {
    return axios.create({
        baseURL: awsExports.API_ENDPOINT,
    });
}