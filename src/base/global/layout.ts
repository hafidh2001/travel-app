import { configs } from "./global";

export interface ILayout {
    width: number;
    scrollPos: number;
    loggedIn: Array<string>;
    role_superadmin: Array<string>;
    role_admin: Array<string>;
    role_user: Array<string>;
    showMenu: boolean;
}

export const gLayout = {
    width: window.innerWidth,
    scrollPos: window.scrollY,
    loggedIn: ["/login"],
    role_superadmin: ["/superadmin"],
    role_admin: ["/destination", "/profile"],
    role_user: ["/destination", "/profile"],
    showMenu: false,
} as ILayout;
