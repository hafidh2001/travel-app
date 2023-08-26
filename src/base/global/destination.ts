import { configs } from "./global";

export interface IDestination {
    loading: boolean;
    list: Array<IDestination>;
    dataById: IDestination;
}

export const gDestination = {
    loading: false,
    list: [],
    dataById: {} as IDestination,
} as IDestination;
