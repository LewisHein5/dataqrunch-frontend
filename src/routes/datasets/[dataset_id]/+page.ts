/** @type {import('./$types').PageLoad} */

export const ssr=false;
export async function load({ params }) {
    return {dataset_id: params.dataset_id}
}
