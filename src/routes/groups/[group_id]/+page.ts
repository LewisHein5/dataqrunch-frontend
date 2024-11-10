/** @type {import('./$types').PageLoad} */
import {DataQrunchClient} from "$lib/dataQrunchClient";

export const ssr = false;
export async function load({params}) {
    let client: DataQrunchClient = new DataQrunchClient();
    let groupId = params.group_id
    let groups = await client.listGroups(groupId);
    let datasets = await client.listDatasets(groupId)
    let current_group = await client.getGroup(groupId)
    
    return {groups: groups.groups,  datasets: datasets.datasets, current_group}
}