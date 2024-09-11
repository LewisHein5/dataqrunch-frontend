<script lang="ts">
    import {
        Breadcrumb, BreadcrumbItem, Toolbar, ToolbarButton, Tooltip,
    } from "flowbite-svelte";
    import {ChevronDoubleRightOutline, GridPlusOutline, HomeOutline} from "flowbite-svelte-icons";

    import {RevoGrid, type RevoGridCustomEvent} from '@revolist/svelte-datagrid';

    // This part to make sure the  revogrid component is loaded and ready
    import {defineCustomElements} from '@revolist/revogrid/loader';
    import {type Dataset, type DatasetRow, DatasetSpec} from "$lib/dataqrunch";
    import {DataQrunchClientFactory} from "$lib/client";
    import NewColumnModalComponent from "../../../components/NewColumnModalComponent.svelte";
    import {apiKey} from "../../../store";
    defineCustomElements();
    /** @type {import('./$types').PageData} */
    
    export let data: { dataset: Dataset, rows: DatasetRow[], types: string[] };
    $: spec = data.dataset.spec[data.dataset.spec.length - 1] as DatasetSpec;
    $: tableSize = {nCols: spec.columns.length, nRows: data.rows.length}
    $: columns = spec.columns.map((x) => {return {prop: x.columnName, name: x.columnName}})
    $: datasetRowObjects = data.rows.map((x:DatasetRow) => {
        let model = {}
        spec.columns.forEach((col,index) => {
            model[col.columnName] = x.data[index];
        });
        return model;
    });

    $: source = [...datasetRowObjects, blankRow()]
    let showModal=false;
    //TODO: Should the load function return the client object?
    
    function blankRow(){
        let blankRow = {};
        spec.columns.forEach((col) => {
            blankRow[col.columnName] = "";
        });

        return blankRow;

    }
    function onBeforeEdit(e: RevoGridCustomEvent<any>){
        //focus = {x: e.detail.columnIndex, y: e.detail.rowIndex};
        if (e.detail.rowIndex === source.length-1){
            source = [...source, blankRow()]
        }

    }
    async function onAfterEdit(e:RevoGridCustomEvent<any>){
        let apiClient = new DataQrunchClientFactory($apiKey).getClientInstance()
        if (apiClient == undefined){
            throw Error("Could not get API client")
        }
        let rowIndex = e.detail.rowIndex;
        let colNames = spec.columns.map((x) => x.columnName);
        let rowDataModel = source[rowIndex];
        let rowData: string[] = []
        for (let colname of colNames){
            rowData.push(rowDataModel[colname] ?? "")
        }
        // TODO: Race condition if spec changes. Get an immutable copy of spec
        let versionNumber = spec.version

        let nRows = tableSize.nRows;
        let result = await apiClient.saveRow(data.dataset.id.id, nRows, rowData, versionNumber);
        console.log(result);

    }
    
    async function addColumn(event: CustomEvent<ColumnDef>){
        let newSpec = spec;
        console.log(event.detail.dataType)
        newSpec.columns.push({columnName: event.detail.columnName, dataTypes: event.detail.dataType})
        spec = newSpec;
        let client = new DataQrunchClientFactory($apiKey).getClientInstance()
        if (client == undefined) {
            throw Error("Could not create API client")
        }
        let dataset: Dataset = {spec: [spec], id: data.dataset.id, name: data.dataset.name}
        await client.saveDataset(dataset)
    }
</script>
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
        {data.dataset.name}
    </BreadcrumbItem>
</Breadcrumb>
<Toolbar>
    <ToolbarButton on:click={() => (showModal=true)} color="blue"><GridPlusOutline></GridPlusOutline></ToolbarButton>
    <Tooltip>Add a new column</Tooltip>
</Toolbar>
<RevoGrid {source} {columns} on:beforeedit={onBeforeEdit} on:afteredit={onAfterEdit} rowHeaders=true></RevoGrid>
<NewColumnModalComponent bind:open={showModal} on:accepted={addColumn}/>