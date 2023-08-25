export interface IMenu {
    title: string;
    title_id: string;
    href: string;
}

export interface INavigation {
    title: string;
    href?: string;
    subnav?: Array<{
        title: string;
        subsubnav: Array<{ title: string; href: string }>;
    }>;
}

interface IRole {
    created_at: string;
    guard_name: string;
    id: number;
    name: string;
    pivot: any[];
    updated_at: string;
}
export interface IUserById {
    created_at: string;
    email: string;
    email_verified_at: string;
    id: number;
    name: string;
    roles: IRole[];
    updated_at: string;
}
