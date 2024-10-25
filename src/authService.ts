import {Auth0Client, createAuth0Client, type PopupLoginOptions} from "@auth0/auth0-spa-js";
import {env} from '$env/dynamic/private'
import {isAuthenticated, popupOpen, user} from "./store";

async function createClient() {
    let domain = env.AUTH0_DOMAIN;
    let clientId = env.AUTH0_CLIENT_ID;
    if (domain === undefined || clientId === undefined){
        throw new Error("Auth0 info not defined")
    }
    return await createAuth0Client(
        {
            domain: domain,
            clientId: clientId
        }
    );
}

async function loginWithPopup(client: Auth0Client, options: PopupLoginOptions) {
    popupOpen.set(true);
    try{
        await client.loginWithPopup(options);
        let auth0User = await client.getUser();
        if (auth0User === undefined){
            throw Error("Unable to authenticate")
        }
        user.set(auth0User)
        isAuthenticated.set(true);
    } catch(e) {
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client: Auth0Client){
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
}

export default auth;