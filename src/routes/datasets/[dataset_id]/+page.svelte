<script lang="ts">
    import {Breadcrumb, BreadcrumbItem, Toolbar, ToolbarButton, Tooltip,} from "flowbite-svelte";
    import {ChevronDoubleRightOutline, GridPlusOutline, HomeOutline} from "flowbite-svelte-icons";

    import {RevoGrid, type RevoGridCustomEvent} from '@revolist/svelte-datagrid';

    // This part to make sure the  revogrid component is loaded and ready
    import {defineCustomElements} from '@revolist/revogrid/loader';
    import {type Dataset, type DatasetRow, DatasetSpec} from "$lib/dataqrunch";
    import NewColumnModalComponent from "../../../components/NewColumnModalComponent.svelte";
    import {DataQrunchClient} from "$lib/dataQrunchClient";
    import {authenticatedToApi} from "../../../store";
    import LoadingComponent from "../../../components/LoadingComponent.svelte";

    defineCustomElements();
    /** @type {import('./$types').PageData} */
    
    export let data: {dataset_id: string};
    let dataset_data: Promise<{ dataset: Dataset, rows: DatasetRow[], types: string[] }>;
    $: dataset_data;
    let spec: DatasetSpec;
    $: spec;
    let columns: {prop: string,  name: string}[];
    $: columns;
    let datasetRowObjects: any[];
    $: datasetRowObjects;
    $: focusedCell = {col: -1, row: -1};
    let source: any[];
    $: source;
    
    let client = new DataQrunchClient()
    let showModal=false;
    async function load() {
        let id = data.dataset_id;
        let client: DataQrunchClient = new DataQrunchClient()
        let dataset = await client.getDataset(id);
        let rows = await client.getAllDatasetRows(id);
        let types = await client.listDataTypes();
        spec = dataset.spec[dataset.spec.length - 1] as DatasetSpec;
        columns = spec.columns.map((x) => {return {prop: x.columnName, name: x.columnName}})
        datasetRowObjects = rows.map((x:DatasetRow) => {
            let model = {}
            spec.columns.forEach((col,index) => {
                //@ts-expect-error
                model[col.columnName] = x.data[index];
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
</script>

{#await dataset_data}
	<LoadingComponent/>
{:then dataset_data}
    {#if dataset_data === undefined}
        <LoadingComponent/>
    {:else}
        <Breadcrumb aria-label="Solid background breadcrumb example" class="bg-gray-50 py-3 px-5 dark:bg-gray-900">
            <BreadcrumbItem href="/" home>
                <svelte:fragment slot="icon">
                    <HomeOutline class="w-4 h-4 me-2"/>
                </svelte:fragment>
                Home
            </BreadcrumbItem>
            <BreadcrumbItem href="/groups">
                <svelte:fragment slot="icon">
                    <ChevronDoubleRightOutline class="w-5 h-5 mx-2 dark:text-white"/>
                </svelte:fragment>
                Datasets
            </BreadcrumbItem>
            <BreadcrumbItem>
                <svelte:fragment slot="icon">
                    <ChevronDoubleRightOutline class="w-5 h-5 mx-2 dark:text-white" />
                </svelte:fragment>
                {dataset_data.dataset.name}
            </BreadcrumbItem>
        </Breadcrumb>
        <Toolbar>
            <ToolbarButton on:click={() => (showModal=true)} class="toolbar-button"><GridPlusOutline></GridPlusOutline> New Column</ToolbarButton>
            <Tooltip>Add a new column</Tooltip>
        </Toolbar>
        <RevoGrid {source} {columns} on:beforeedit={onBeforeEdit} on:afteredit={onAfterEdit} rowHeaders=true></RevoGrid>
        <NewColumnModalComponent bind:open={showModal} on:accepted={(event)=>{addColumn(event, dataset_data.dataset)}} />
    {/if}
{/await}