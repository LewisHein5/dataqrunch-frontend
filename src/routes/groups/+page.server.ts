/** @type {import('./$types').PageLoad} */
import {DataQrunchClientFactory} from "$lib/client";
import {get_jwt_cookie} from "$lib/utilities";
import {redirect} from "@sveltejs/kit";

export async function load({ cookies }) {
    let api_key = get_jwt_cookie(cookies)
    let client = new DataQrunchClientFactory(api_key).getClientInstance();
    if (client == undefined){
        redirect(303, "/");
    } 
    let groups = await client.listGroups(undefined);
    let datasets = await client.listDatasets(undefined)
    let types = await client.listDataTypes();
    
    return {groups: groups.groups,  datasets: datasets.datasets, types: types}
}