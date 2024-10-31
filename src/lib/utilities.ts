import {type Cookies, redirect} from "@sveltejs/kit";

export function get_jwt_cookie(cookies: Cookies){
    let api_key = cookies.get("jwt")
    if (api_key === null || api_key === undefined){
        redirect(307, "/") //TODO: Is 307 correct?
    }
    return api_key
}