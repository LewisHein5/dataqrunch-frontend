
export async function load({ request, cookies }) {
    let api_key = request.headers.get("jwt");
    let path = request.url
    if (api_key !== null){
        //Todo: eventually set this to allow use on api.dataqrunch.com
        cookies.set("jwt", api_key, {path: "/", httpOnly: true, sameSite: "lax"})
    }
    return {url: path}
}