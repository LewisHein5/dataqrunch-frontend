/** @type {import('./$types').PageLoad} */
import {DataQrunchClientFactory} from "$lib/client";

//todo: use a slug
export async function load({ params, cookies }) {
    let api_key = cookies.get("jwt")
    if (api_key === null || api_key === undefined){
        throw Error("No API Key")
    }
    let client = new DataQrunchClientFactory(api_key).getClientInstance();
    let groups = await client.listGroups(undefined);
    let datasets = await client.listDatasets(undefined)
    
    return {groups: groups.groups,  datasets: datasets.datasets}
}