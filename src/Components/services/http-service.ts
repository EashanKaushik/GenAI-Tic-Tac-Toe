import apiGateway from "./apiGateway-client";
import {AxiosInstance} from "axios";

export class HttpService {

    apiClient: AxiosInstance;

    constructor() {
        this.apiClient = apiGateway()
    }

    get(currentBoard: any[]){
        const controller = new AbortController();
        console.log(encodeURIComponent(JSON.stringify(currentBoard)))
        const request = this.apiClient.get('', {params: {current_board: encodeURIComponent(JSON.stringify(currentBoard))}, signal: controller.signal});

        return {request, cancel: () => controller.abort()};
    }
}

const create = () => {
    return new HttpService();
};

export default create;