import { IUserById } from "./interface";

export interface ISuperAdmin {
    loadingListUser: boolean;
    listUser: Array<IUserById>;
    dataUserById: any;
    popup: boolean;
    selected_userId: number;
}

export const gSuperAdmin = {
    loadingListUser: false,
    listUser: [],
    dataUserById: {} as any,
    popup: false,
    selected_userId: 0,
} as ISuperAdmin;
