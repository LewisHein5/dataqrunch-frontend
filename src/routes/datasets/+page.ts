/** @type {import('./$types').PageLoad} */
import {createChannel, createClient} from 'nice-grpc-web';
import {type DataQrunchServiceClient, DataQrunchServiceDefinition, type DatasetsList} from "$lib/dataqrunch";


export async function load({ params }) {
    const channel = createChannel('http://localhost:10000');

    const client: DataQrunchServiceClient = createClient(
        DataQrunchServiceDefinition,
        channel,
    );
    return await client.listGroups({group: undefined});
}