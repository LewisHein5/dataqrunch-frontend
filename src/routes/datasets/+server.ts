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
        var body = await event.request.json()
        var result = await client.createDataset(body) //todo: constraints
        var options: ResponseInit = {
            status: 201,
        }
        return new Response(JSON.stringify(result), options);
    }
    return new Response("", {status: 400}); 
}

//TODO: reduce duplication
export async function PUT(event): Promise<Response> {
    var apiKey = event.cookies.get("jwt")
    if (apiKey == "" || apiKey == undefined){
        redirect(303, "/")
    }
    let client = new DataQrunchClientFactory(apiKey).getClientInstance()
    if (client !== undefined){
        //todo: log an error if client is undefined
        let body = await event.request.json();
        let result = await client.saveDataset(body);
        let options: ResponseInit = {
            status: 201,
        };
        return new Response(JSON.stringify(result), options);
    }
    return new Response("", {status: 400});
}