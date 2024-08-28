import {type Channel, createChannel, createClient} from "nice-grpc-web";
import {
    type DataQrunchServiceClient,
    DataQrunchServiceDefinition,
    type Dataset, type DatasetIdModel,
    type DatasetRow, DatasetRowUploadRequest
} from "$lib/dataqrunch";
/*
To compile lib from proto file run from src/lib:
../../node_modules/.bin/grpc_tools_node_protoc   --plugin=protoc-gen-ts_proto=../../node_modules/.bin/protoc-gen-ts_proto   --ts_proto_out=.   --ts_proto_opt=env=browser,outputServices=nice-grpc,outputServices=generic-definitions,outputJsonMethods=false,useExactTypes=false   --proto_path=../../proto   ../../proto/dataqrunch.proto
 */
class Client{
    private channel: Channel;
    private client: DataQrunchServiceClient
    
    constructor() {
        this.channel = createChannel("http://localhost:10000")
        this.client = createClient(DataQrunchServiceDefinition, this.channel)
    }
    
    public async getDataset(id: string): Promise<Dataset> {
        return await this.client.getDataset(this.createIdModel(id));
    }
    
    public async getAllDatasetRows(id: string): Promise<DatasetRow[]>{
        let info = await this.client.getDatasetInfo(this.createIdModel(id))
        let rows = await this.client.getDatasetRows({id: this.createIdModel(id), rowStart: 0, nRows: info.nRows})
        return rows.rows
    }
    
    public async saveDatasetRow(id: string,  row: DatasetRow): Promise<DatasetRow>{
        let request: DatasetRowUploadRequest = {
            id: this.createIdModel(id),
            row: row
        };
        return await this.client.addRows(request);
    }
    
    private createIdModel(id: string): DatasetIdModel {
        return {id: id}
    }
}

export class DataQrunchClientFactory {
    private static client: Client = new Client()
    
    public static getClientInstance(): Client {
        return this.client
    }
}