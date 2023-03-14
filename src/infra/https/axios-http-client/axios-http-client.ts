import { HttpGetParams, HttpPostClient, HttpPostParams, HttpResponse } from "@/data/protocols/http";
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpPostClient<any> {
    async post({ url, body }: HttpPostParams): Promise<HttpResponse> {
        let axiosResponse: AxiosResponse
        try {
            axiosResponse = await axios.post(url, body);
        } catch (error) {
            axiosResponse = error.response
        }

        return this.adapt(axiosResponse)
    }

    async get(params: HttpGetParams): Promise<HttpResponse> {
        let axiosResponse: AxiosResponse
        try {
            axiosResponse = await axios.get(params.url, {
                headers: params.headers
            });
        } catch (error) {
            axiosResponse = error.response
        }
        return this.adapt(axiosResponse)
    }


    private adapt(axiosResponse: AxiosResponse): HttpResponse {
        return {
            statusCode: axiosResponse.status,
            body: axiosResponse.data
        };
    }
}
