/** @type {import('./$types').PageLoad} */
import {DataQrunchClientFactory} from "$lib/client";

//todo: use a slug
export async function load({ params }) {
    let client = DataQrunchClientFactory.getClientInstance();
    let groups = await client.listGroups(undefined);
    let datasets = await client.listDatasets(undefined)
    
    return {groups: groups.groups,  datasets: datasets.datasets}
}