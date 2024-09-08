
export async function load({ request, cookies }) {
    let api_key = request.headers.get("jwt");
    let path = request.url
    if (api_key !== null){
        cookies.set("jwt", api_key, {path: "/", httpOnly: true})
    }
    return {url: path}
}