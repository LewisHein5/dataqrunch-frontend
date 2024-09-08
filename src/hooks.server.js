//TODO: CAn we delete this file?
import {apiKey} from "./store";
let api_key = "";

apiKey.subscribe((x) => api_key = x);
export async function handleFetch({event, request, fetch}) {
    console.log("Handled a fetch")
    if (api_key !== "" && apiKey !== undefined &&api_key !== null){
        request.headers.set("Authorization", api_key)
    }
    return await fetch(request);
}