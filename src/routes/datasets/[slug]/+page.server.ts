/** @type {import('./$types').PageLoad} */
import {DataQrunchClientFactory} from "$lib/client";


export async function load({ params, cookies }) {
    let api_key = cookies.get("jwt")
    console.log("API key: " + api_key)
    if (api_key === null || api_key === undefined){
        throw Error("Grr")
    }
    let id = params.slug;
    //TODO: Figure out how to make the client/factory a singleton
    let client = new DataQrunchClientFactory(api_key).getClientInstance()
    let dataset = await client.getDataset(id);
    let rows = await client.getAllDatasetRows(id);
    let types = await client.listDataTypes();
    
    return {dataset: dataset, rows: rows, types: types}
}

export const ssr=false;