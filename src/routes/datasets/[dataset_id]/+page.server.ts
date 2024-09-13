/** @type {import('./$types').PageLoad} */
import {DataQrunchClientFactory} from "$lib/client";
import {get_jwt_cookie} from "$lib/utilities";
import {Client} from "$lib/client"


export async function load({ params, cookies }) {
    let api_key = get_jwt_cookie(cookies)
    let id = params.dataset_id;
    //TODO: Figure out how to make the client/factory a singleton
    //TODO FIXME: Handle if the client is undefined
    // @ts-expect-error
    let client: Client = new DataQrunchClientFactory(api_key).getClientInstance()
    let dataset = await client.getDataset(id);
    let rows = await client.getAllDatasetRows(id);
    let types = await client.listDataTypes();
    
    return {dataset: dataset, rows: rows, types: types}
}

export const ssr=false;