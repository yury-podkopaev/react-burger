import { BASE_URL } from "../constants";

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async () => {
  const res = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
    return checkResponse(res);
};

export const fetchWithRefresh = async (url: string, options?: RequestInit) => { 
  try {
    const res = await fetch(`${BASE_URL}${url}`, {...options, headers: {...options?.headers, 'Authorization': localStorage.getItem('token') ?? ''}});
    
    return await checkResponse(res);
  } catch (err: any) {    
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      (options?.headers as Headers).append(
        "Authorization",
        refreshData.accessToken
      );
      const res = await fetch(`${BASE_URL}${url}`, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
