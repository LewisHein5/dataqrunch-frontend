import {DataQrunchClientFactory} from "$lib/client";
import {redirect} from "@sveltejs/kit";

export async function POST(event): Promise<Response> {
    var apiKey = event.cookies.get("jwt")
    if (apiKey == "" || apiKey == undefined){
        redirect(303, "/")
    }
    let client = new DataQrunchClientFactory(apiKey).getClientInstance()
    if (client !== undefined){
        //todo: log an error if client is undefined
        let body = await event.request.json();
        let result = await client.saveRow(body.dataset_id, body.row_num, body.row_data, body.version_number);
        let options: ResponseInit = {
            status: 201,
        };
        return new Response(JSON.stringify(result), options);
    }
    return new Response("", {status: 400});
}