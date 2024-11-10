/** @type {import('./$types').PageLoad} */
import {DataQrunchClient} from "$lib/dataQrunchClient";

export const ssr=false;

export async function load()
{
    let client = new DataQrunchClient();
    let groups = await client.listGroups(undefined);
    let datasets = await client.listDatasets(undefined)
    let types = await client.listDataTypes();
    
    return {groups: groups.groups,  datasets: datasets.datasets, types: types}
}