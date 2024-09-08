/** @type {import('./$types').PageLoad} */
import {get_jwt_cookie} from "$lib/utilities";

//TODO: Do we need this?
export async function load({ cookies }) {
    try {
        get_jwt_cookie(cookies);
    }
    catch (e) {
        return {logged_in: false}
    }
    
    return {logged_in: true}
}