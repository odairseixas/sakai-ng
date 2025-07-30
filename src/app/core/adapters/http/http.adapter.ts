import axios from 'axios';
import axiosRetry from 'axios-retry';

export class HttpAdapter {

    public static get(url: string, config?: any): Promise<any> {
        // console.log(`HttpAdapter.get -> ${url}`);
        axiosRetry(axios, { retries: 3 });
        return axios.get(url, config);
    }

    public static post(url: string, payload?: any, config?: any): Promise<any> {
        // console.log(`HttpAdapter.post -> ${url}`);
        axiosRetry(axios, { retries: 3 });
        return axios.post(url, payload, config);
    }

    public static put(url: string, payload?: any, config?: any): Promise<any> {
        // console.log(`HttpAdapter.put -> ${url}`);
        axiosRetry(axios, { retries: 3 });
        return axios.put(url, payload, config);
    }

    public static delete(url: string, config?: any): Promise<any> {
        // console.log(`HttpAdapter.delete -> ${url}`);
        axiosRetry(axios, { retries: 3 });
        return axios.delete(url, config);
    }

    public static postForm(url: string, formData: FormData, config?: any): Promise<any> {
        // console.log(`HttpAdapter.postForm -> ${url}`);
        axiosRetry(axios, { retries: 3 });
        return axios.post(url, formData, {
            ...config,
            headers: {
                ...config?.headers,
                'Content-Type': 'multipart/form-data'
            }
        });
    }

}
