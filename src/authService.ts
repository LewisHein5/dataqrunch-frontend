import {Auth0Client, createAuth0Client, type PopupLoginOptions} from "@auth0/auth0-spa-js";
import {isAuthenticated, popupOpen, user} from "./store";
import {config} from "./auth_config";

async function createClient() {
    return await createAuth0Client(
        {
            domain: config.domain,
            clientId: config.clientId
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