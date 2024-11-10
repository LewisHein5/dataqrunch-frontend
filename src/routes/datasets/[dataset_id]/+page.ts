/** @type {import('./$types').PageLoad} */
import {DataQrunchClient} from "$lib/dataQrunchClient"

export const ssr=false;
export async function load({ params }) {
    let id = params.dataset_id;
    let client: DataQrunchClient = new DataQrunchClient()
    let dataset = await client.getDataset(id);
    let rows = await client.getAllDatasetRows(id);
    let types = await client.listDataTypes();
    
    return {dataset: dataset, rows: rows, types: types}
}
