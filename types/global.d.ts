// export {} above : for avoid error (Augmentations for the global scope can only be directly nested in external modules or ambient module declarations.)
export { };

declare global {
    interface Window {
        user: {
            id: number;
            email: string;
            name: string;
            token: string;
        };
    }
}
