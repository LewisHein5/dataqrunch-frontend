/** @type {import('./$types').PageLoad} */
import {DataQrunchClientFactory} from "$lib/client";


export async function load({ params }) {
    let id = params.slug;
    let client = DataQrunchClientFactory.getClientInstance()
    let dataset = await client.getDataset(id);
    let rows = await client.getAllDatasetRows(id);
    let types = await client.listDataTypes();
    
    return {dataset: dataset, rows: rows, types: types}
}

export const ssr=false;