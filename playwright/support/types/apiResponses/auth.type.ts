type LOGIN_RESPONSE = {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
};
