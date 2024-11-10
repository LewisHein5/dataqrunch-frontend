import {writable} from "svelte/store";
import {User} from "@auth0/auth0-spa-js";
export const user = writable<User|undefined>(undefined);
export const popupOpen = writable(false);
export const authenticatedToApi = writable(false);
