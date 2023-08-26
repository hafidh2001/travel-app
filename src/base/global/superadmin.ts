import { IUserById } from "./interface";

export interface ISuperAdmin {
    loadingListUser: boolean;
    listUser: Array<IUserById>;
    dataUserById: IUserById;
    popupDelete: boolean;
    selected_userId: number;
}

export const gSuperAdmin = {
    loadingListUser: false,
    listUser: [],
    dataUserById: {} as IUserById,
    popupDelete: false,
    selected_userId: 0,
} as ISuperAdmin;
