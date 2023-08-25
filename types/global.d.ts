// export {} above : for avoid error (Augmentations for the global scope can only be directly nested in external modules or ambient module declarations.)
export { };

declare global {
    interface Window {
        subnav: [];
        subsubnav: [];
        user: {
            user_id: number;
            email: string;
            username: string;
            role: "administrator" | "user";
            is_active: string;
            auth: {
                access_token: string;
                token_type: string;
            };
        };
    }
}
