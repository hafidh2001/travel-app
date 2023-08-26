import axios, { AxiosResponse } from "axios";
import { configs } from "../base/global/global";

const response = (
    res: AxiosResponse<any, any>,
    resolve: (value: unknown) => void,
    reject: (value: unknown) => void
) => {
    if (res.status === 200) {
        const d = res.data;
        if (d.status === "error") {
            reject(d.Error);
            alert(d.Error);
            console.error(d.Error);
        } else {
            resolve(d.data);
        }
    } else {
        reject(res);
        alert(res.statusText);
        console.error(res);
    }
};

export const logoutUser = async () => {
    await axios
        .post(`${configs.url_backend}/api/logout`, {
            headers: {
                Authorization: `Bearer ${(window as any).user.token}`,
            },
        })
        .then((res) => {
            if (!!res) {
                localStorage.removeItem(configs.storage_user);
                (window as any).user = {};

                setTimeout(() => {
                    window.location.href = `${window.location.origin}/login`;
                }, 100);
            }
        });
};

export const getUserById = (user_id: number, token: string) => {
    return new Promise(async (resolve, reject) => {
        const res = await axios.get(`${configs.url_backend}/api/user/${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        response(res, resolve, reject);
    });
};

// destination
export const getAllDestination = (limit: number, page?: number) => {
    return new Promise(async (resolve, reject) => {
        const res = await axios.get(`${configs.url_backend}/api/destination`, {
            headers: {
                Authorization: `Bearer ${(window as any).user.token}`,
            },
            params: {
                limit: limit,
                page: page,
            },
        });
        response(res, resolve, reject);
    });
};
