<script lang="ts">
    import { run } from 'svelte/legacy';

    import {Breadcrumb, BreadcrumbItem, Toolbar, ToolbarButton, Tooltip,} from "flowbite-svelte";
    import {ChevronDoubleRightOutline, GridPlusOutline, HomeOutline} from "flowbite-svelte-icons";
    //@ts-ignore
    import {Grid} from "wx-svelte-grid";
    //@ts-ignore
    import {Material} from "wx-svelte-grid";

    import {type Dataset, type DatasetRow, DatasetSpec} from "$lib/dataqrunch";
    import NewColumnModalComponent from "../../../components/NewColumnModalComponent.svelte";
    import {DataQrunchClient} from "$lib/dataQrunchClient";
    import {authenticatedToApi} from "../../../store";
    import LoadingComponent from "../../../components/LoadingComponent.svelte";
    
    
    interface Props {
        /** @type {import('./$types').PageData} */
        data: {dataset_id: string};
    }

    let { data }: Props = $props();
    let dataset_data: Promise<{ dataset: Dataset, rows: DatasetRow[], types: string[] }> = $state();
    run(() => {
        dataset_data;
    });
    let spec: DatasetSpec = $state();
    run(() => {
        spec;
    });
    let columns: {prop: string,  name: string}[] = $state();
    run(() => {
        columns;
    });
    let datasetRowObjects: any[] = $state();
    run(() => {
        datasetRowObjects;
    });
    let focusedCell;
    run(() => {
        focusedCell = {col: -1, row: -1};
    });
    let source: any[] = $state();
    run(() => {
        source;
    });
    
    let client = new DataQrunchClient()
    let showModal=$state(false);
    async function load() {
        let id = data.dataset_id;
        let client: DataQrunchClient = new DataQrunchClient()
        let dataset = await client.getDataset(id);
        let rows = await client.getAllDatasetRows(id);
        let types = await client.listDataTypes();
        spec = dataset.spec[dataset.spec.length - 1] as DatasetSpec;
        columns = spec.columns.map((x) => {return {id: x.columnName, header: x.columnName, footer: x.columnName, editor: "text"}})
        datasetRowObjects = rows.map((x:DatasetRow) => {
            let model = {}
            spec.columns.forEach((col,index) => {
                //@ts-expect-error
                model[col.columnName] = x.data[index];
                model["id"] = x.rowNum
            });
            return model;
        });
        source = [...datasetRowObjects, blankRow()]

        return {dataset: dataset, rows: rows, types: types}
    }
    
    authenticatedToApi.subscribe((authenticated) =>{
        if (authenticated){
            dataset_data = load()
        }
    })
    
    function blankRow(){
        let blankRow = {};
        spec.columns.forEach((col) => {
            //@ts-expect-error
            blankRow[col.columnName] = ""; 
        });

        return blankRow;

    }
    function onBeforeEdit(e: RevoGridCustomEvent<any>){
        focusedCell = {col: e.detail.colIndex, row: e.detail.rowIndex};
        if (e.detail.rowIndex === source.length-1){
            source = [...source, blankRow()]
        }

    }
    async function onAfterEdit(e:RevoGridCustomEvent<any>){
        let rowIndex = e.detail.rowIndex;
        let colNames = spec.columns.map((x) => x.columnName);
        let rowDataModel = source[rowIndex];
        let rowData: string[] = []
        for (let colname of colNames){
            rowData.push(rowDataModel[colname] ?? "")
        }
        // TODO: Race condition if spec changes. Get an immutable copy of spec
        let versionNumber = spec.version
        await client.saveRow(data.dataset_id, focusedCell.row, rowData, versionNumber)
    }
    
    //TODO: All these functions need to go into a service layer
    async function addColumn(event: CustomEvent<ColumnDef>, old_dataset: Dataset){
        let newSpec = spec;
        console.log(event.detail.dataType)
        newSpec.columns.push({columnName: event.detail.columnName, dataType: event.detail.dataType})
        spec = newSpec;
        
        let dataset: Dataset = {spec: [spec], id: old_dataset.id, name: old_dataset.name}
        await client.saveDataset(dataset);
    }  
    
    //@ts-ignore
    function init(api){
        //@ts-ignore
        api.on("update-cell", (ev) =>{console.log(ev)});
    }
</script>
{#await dataset_data}
	<LoadingComponent/>
{:then dataset_data}
    {#if dataset_data === undefined}
        <LoadingComponent/>
    {:else}
        <Breadcrumb aria-label="Solid background breadcrumb example" class="bg-gray-50 py-3 px-5 dark:bg-gray-900">
            <BreadcrumbItem href="/" home>
                {#snippet icon()}
                    <HomeOutline class="w-4 h-4 me-2"/>
                {/snippet}
                Home
            </BreadcrumbItem>
            <BreadcrumbItem href="/groups">
                {#snippet icon()}
                    <ChevronDoubleRightOutline class="w-5 h-5 mx-2 dark:text-white"/>
                {/snippet}
                Datasets
            </BreadcrumbItem>
            <BreadcrumbItem>
                {#snippet icon()}
                    <ChevronDoubleRightOutline class="w-5 h-5 mx-2 dark:text-white" />
                {/snippet}
                {dataset_data.dataset.name}
            </BreadcrumbItem>
        </Breadcrumb>
        <Toolbar>
            <ToolbarButton on:click={() => (showModal=true)} class="toolbar-button"><GridPlusOutline></GridPlusOutline> New Column</ToolbarButton>
            <Tooltip>Add a new column</Tooltip>
        </Toolbar>
        <Material>
            <Grid data={source} {columns} {init} footer={true}/>
        </Material>
        <NewColumnModalComponent bind:open={showModal} on:accepted={(event)=>{addColumn(event, dataset_data.dataset)}} />
    {/if}
{/await}