import type { Comic } from '../types/types';
import axios from 'axios';
import md5 from 'crypto-js/md5';

const BASE_URL = "https://gateway.marvel.com:443/";

const getAuthenticationParams = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const combination = `${timestamp}${import.meta.env.VITE_MARVEL_PRIVATE_KEY}${import.meta.env.VITE_MARVEL_PUBLIC_KEY}`;
    const hash = md5(combination);

    return {
        apikey: import.meta.env.VITE_MARVEL_PUBLIC_KEY,
        hash,
        ts: timestamp
    };
}

export const getComics = async (offset: number = 0, limit: number = 40): Promise<Array<Comic>> => {
    const endpoint = "v1/public/comics?";
    const authParams = getAuthenticationParams();
    const url = BASE_URL + endpoint;

    return [];
    try {
        const response = await axios.get(url, {
            params: {
                ...authParams,
                offset,
                limit
            }
        });
        if (response.data.code == 200) {
            return (response.data.data.results as Array<Comic>);
        } else {
            throw Error("Bad Request | Status Code: " + response.data.code);
        }
    } catch (error: any) {
        let errMsg = "";

        if (error.response) {
            console.error('Response error:', error.response.data);
            console.error('Status code:', error.response.status);
            errMsg = error.response.data;
        } else if (error.request) {
            console.error('No response received:', error.request);
            errMsg = "Server does not respond!";
        } else {
            console.error('Request error:', error.message);
            errMsg = "UNKNOWN ERROR: " + error.message;
        }

        //throw Error(errMsg);
        console.log(errMsg);
        return [];
    }
}