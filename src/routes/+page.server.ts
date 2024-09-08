/** @type {import('./$types').PageLoad} */
import {createChannel, createClient} from 'nice-grpc-web';
import {type DataQrunchServiceClient, DataQrunchServiceDefinition} from "$lib/dataqrunch";
import {get_jwt_cookie} from "$lib/utilities";

//TODO: Do we need this?
export async function load({ cookies }) {
    try {
        let api_key = get_jwt_cookie(cookies)
    }
    catch (e) {
        return {logged_in: false}
    }
    
    return {logged_in: true}
}