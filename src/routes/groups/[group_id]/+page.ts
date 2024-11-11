/** @type {import('./$types').PageLoad} */

export const ssr = false;
export async function load({params}) {
    let groupId = params.group_id
    return {group_id: groupId}
}