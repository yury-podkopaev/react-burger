import { BASE_URL } from "../constants";

export const fetchUrl = async (url: string, options?: RequestInit) => {
    return await fetch(BASE_URL + url, options).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    });
};
