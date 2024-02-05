import { BASE_URL } from "../constants";

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async <T> (): Promise<T> => {
  const res = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
    return res.json();
};

export const fetchWithRefresh = async <T> (url: string, options?: RequestInit):Promise<T> => { 
  try {
    const res = await fetch(`${BASE_URL}${url}`, {...options, headers: {...options?.headers, 'Authorization': localStorage.getItem('token') ?? ''}});
    return await checkResponse<T>(res);
  } catch (err: any) {    
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken<{ success: boolean, refreshToken: string, accessToken: string }>(); //обновляем токен
      if (!refreshData.success) {
        localStorage.setItem("refreshToken", '');
        localStorage.setItem("token", '');
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("token", refreshData.accessToken);
      const res = await fetch(`${BASE_URL}${url}`, {...options, headers: {...options?.headers, 'Authorization': localStorage.getItem('token') ?? ''}}); //повторяем запрос
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};
