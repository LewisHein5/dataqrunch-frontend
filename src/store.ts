import {writable} from "svelte/store";
import {User} from "@auth0/auth0-spa-js";
//TODO: Figure out if a store is appropriate for these
export const isAuthenticated = writable(false);
export const user = writable<User>({});
export const popupOpen = writable(false);
export const error = writable();
