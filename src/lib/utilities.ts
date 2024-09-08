import {type Cookies, error} from "@sveltejs/kit";

export function get_jwt_cookie(cookies: Cookies){
    let api_key = cookies.get("jwt")
    if (api_key === null || api_key === undefined){
        throw error(401)
    }
    return api_key
}