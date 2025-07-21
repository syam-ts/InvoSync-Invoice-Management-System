
export const logoutHelperFunction = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
};
