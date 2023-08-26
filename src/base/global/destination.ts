import { configs } from "./global";
import { IDataDestination, IPagination } from "./interface";

export interface IDestination {
    loading: boolean;
    list: Array<IDataDestination>;
    list_total: number;
    pagination: Array<IPagination>;
    current_page: number,
    dataById: IDataDestination;
}

export const gDestination = {
    loading: false,
    list: [],
    list_total: 0,
    pagination: [],
    current_page: 0,
    dataById: {} as IDataDestination,
} as IDestination;
