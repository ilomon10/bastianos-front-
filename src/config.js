function config(baseURL) {
    console.log(baseURL);
    return {
        "server": {
            "baseURL": baseURL,
            "api": baseURL + "/api",
            "admin": baseURL + "/admin"
        }
    }
}
// export default config(window.location.origin.split(':')[1]+':8085')
export default config('https://10.10.10.129:8085')