import {type Channel, createChannel, createClient, type DefaultCallOptions, Metadata} from "nice-grpc-web";
import {
    type DataQrunchServiceClient,
    DataQrunchServiceDefinition,
    type Dataset, type DatasetIdModel,
    type DatasetRow, DatasetRowUploadRequest, type DatasetSpec
} from "$lib/dataqrunch";
import auth from "../authService";
import type {CallOptions} from "nice-grpc-common";
/*
To compile lib from proto file run from src/lib:
../../node_modules/.bin/grpc_tools_node_protoc   --plugin=protoc-gen-ts_proto=../../node_modules/.bin/protoc-gen-ts_proto   --ts_proto_out=.   --ts_proto_opt=env=browser,outputServices=nice-grpc,outputServices=generic-definitions,outputJsonMethods=false,useExactTypes=false   --proto_path=../../proto   ../../proto/dataqrunch.proto
 */
class Client{
    private channel: Channel;
    private client: DataQrunchServiceClient
    private auth_token: string;
    private call_options: CallOptions;
    
    constructor(auth_token: string) {
        this.auth_token = auth_token
        //TODO: USe the auth everywhere
        this.call_options = {
            metadata: Metadata({Authorization: "Bearer " + this.auth_token})
        }
        
        this.channel = createChannel("http://localhost:10000")
        this.client = createClient(DataQrunchServiceDefinition, this.channel)
    }
    
    public async getDataset(id: string): Promise<Dataset> {
        return await this.client.getDataset(this.createIdModel(id), this.call_options);
    }
    
    public async getAllDatasetRows(id: string): Promise<DatasetRow[]>{
        let info = await this.client.getDatasetInfo(this.createIdModel(id))
        let rows = await this.client.getDatasetRows({id: this.createIdModel(id), rowStart: 0, nRows: info.nRows})
        return rows.rows
    }
    
    public async saveRow(id: string, row_number: number, row_data: string[], dataset_spec_version: number): Promise<DatasetRow>{
        let request: DatasetRowUploadRequest = {
            id: this.createIdModel(id),
            datasetSpecVersion: dataset_spec_version,
            data: row_data,
            rowNum: {rowNum: row_number} //FIXME: Should only send this if editing a row
        };
        return await this.client.addOrModifyRow(request);
    }
    
    public async saveDataset(dataset: Dataset): Promise<Dataset> {
        return await this.client.modifyDataset(dataset)
    }
    
    public async listGroups(parent_group_id: string|undefined){
        let group_id = this.computeIdModelFromString(parent_group_id)
        return await this.client.listGroups(group_id, this.call_options);
    }

    public async listDatasets(parent_group_id: string|undefined){
        let group_id = this.computeIdModelFromString(parent_group_id)
        return await this.client.listDatasets(group_id)
    }
    
    public async listDataTypes(): Promise<string[]> {
        return (await this.client.listDataTypes({})).types
    }

    private createIdModel(id: string): DatasetIdModel {
        return {id: id}
    }


    private computeIdModelFromString(parent_group_id: string | undefined) {
        return parent_group_id === undefined ? {} : {group: this.createIdModel(parent_group_id)};
    }
}

export class DataQrunchClientFactory {
    private readonly client: Client;
    constructor(authToken: string) {
        this.client = new Client(authToken)
    }
    
    public getClientInstance(): Client {
        return this.client;
    }
}