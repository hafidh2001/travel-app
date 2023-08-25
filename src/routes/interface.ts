export interface IChildPage {
    path: string;
    element: JSX.Element;
}

export interface IPage {
    path: string;
    element: JSX.Element;
    child?: Array<IChildPage>;
}

export interface IRoutes {
    layout?: JSX.Element;
    pages: Array<IPage>;
}
