/** @type {import('./$types').PageLoad} */
import {DataQrunchClientFactory} from "$lib/client";
import {get_jwt_cookie} from "$lib/utilities";

//todo: use a slug
export async function load({ params, cookies }) {
    let api_key = get_jwt_cookie(cookies)
    let client = new DataQrunchClientFactory(api_key).getClientInstance();
    let groups = await client.listGroups(undefined);
    let datasets = await client.listDatasets(undefined)
    
    return {groups: groups.groups,  datasets: datasets.datasets}
}