import auth from "../authService";
import type {User} from "@auth0/auth0-spa-js";
import {authenticatedToApi} from "../store";

export async function get_api_session_token(user: User | undefined) {
    if (user != undefined) {
        let auth0Client = await auth.createClient();
        let options = {authorizationParams: {audience: "localhost/gablorp/whyy"}}
        let token = await auth0Client.getTokenSilently(options); //TODO: FIXME
        let response = await fetch("https://api.dataqrunch.com:10000",
            {
                method: "GET",
                credentials: "include",
                headers: {"authorization": token}
            })
        if (response.status == 200){
            authenticatedToApi.set(true)
        }
    }
}

export async function erase_api_session_token(){
    await fetch("https://api.dataqrunch.com:10000",
        {
            method: "GET",
            credentials: "include",
            headers: {"authorization": ""}
        });
    authenticatedToApi.set(false)
}