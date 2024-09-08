import {writable} from "svelte/store";
import {User} from "@auth0/auth0-spa-js";

export const isAuthenticated = writable(false);
export const user = writable<User>({});
export const popupOpen = writable(false);
//TODO: Should the api key really be here?
export const apiKey = writable<string>()
export const error = writable();
