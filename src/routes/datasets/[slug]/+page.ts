/** @type {import('./$types').PageLoad} */
import {createChannel, createClient} from 'nice-grpc-web';
import {type DataQrunchServiceClient, DataQrunchServiceDefinition} from "$lib/dataqrunch";
import {DataQrunchClientFactory} from "$lib/client";


export async function load({ params }) {
    let id = params.slug;
    let client = DataQrunchClientFactory.getClientInstance()
    let dataset = await client.getDataset(id);
    let rows = await client.getAllDatasetRows(id);
    console.log(rows)
    
    return {dataset: dataset, rows: rows}
}

export const ssr=false;