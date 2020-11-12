export const logout = (): void => {
    localStorage.removeItem("token");
}

export const isLoggedIn = (): boolean => {
    if (localStorage.getItem("token")) {
        console.log("logged in");
        return true;
    } else {
        return false;
    }
}