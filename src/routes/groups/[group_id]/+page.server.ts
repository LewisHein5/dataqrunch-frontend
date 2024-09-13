/** @type {import('./$types').PageLoad} */
import {Client, DataQrunchClientFactory} from "$lib/client";
import {get_jwt_cookie} from "$lib/utilities";

//todo: use a route parameter
export async function load({ params, cookies }) {
    let api_key = get_jwt_cookie(cookies)
    //FIXME: Handle undefined client
    // @ts-expect-error
    let client: Client = new DataQrunchClientFactory(api_key).getClientInstance();
    let groupId = params.group_id
    let groups = await client.listGroups(groupId);
    let datasets = await client.listDatasets(groupId)
    let current_group = await client.getGroup(groupId)
    
    return {groups: groups.groups,  datasets: datasets.datasets, current_group}
}