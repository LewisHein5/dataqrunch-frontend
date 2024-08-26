/** @type {import('./$types').PageLoad} */
import {createChannel, createClient} from 'nice-grpc-web';
import {type DataQrunchServiceClient, DataQrunchServiceDefinition} from "$lib/dataqrunch";


export async function load({ params }) {
    let id = params.slug;
    const channel = createChannel('http://localhost:10000');

    const client: DataQrunchServiceClient = createClient(
        DataQrunchServiceDefinition,
        channel,
    );
    let dataset = await client.getDataset({id: id});
    let info = await client.getDatasetInfo({id: id})
    let rows = await client.getDatasetRows({id: {id: id}, rowStart: 0, nRows: info.nRows})
    console.log(rows);
    
    return {dataset: dataset, rows: rows}
}

export const ssr=false;