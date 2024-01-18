import { BASE_URL } from "../constants";

export const fetchUrl = async <T>(url: string, options?: RequestInit): Promise<T> => {
    return await fetch(BASE_URL + url, options).then(async res => {
        if (res.ok) {
            return res.json();
        }
        return res.json().then((err) => Promise.reject(err));
    });
};
