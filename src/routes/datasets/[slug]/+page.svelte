<script lang="ts">
    import {
        Breadcrumb, BreadcrumbItem,
    } from "flowbite-svelte";
    import {ChevronDoubleRightOutline, HomeOutline} from "flowbite-svelte-icons";

    /** @type {import('./$types').PageData} */
    export let data;
    let focus = {x: -1, y: -1}
    $: spec = data.dataset.spec[data.dataset.spec.length - 1] as DatasetSpec;
    $: tableSize = {nCols: spec.columns.length, nRows: data.rows.length}
    let rowsWithChanges = new Set()

    import {RevoGrid, type RevoGridCustomEvent} from '@revolist/svelte-datagrid';

    // This part to make sure the  revogrid component is loaded and ready
    import {defineCustomElements} from '@revolist/revogrid/loader';
    import {type DatasetRow, DatasetSpec, type OptionalUInt64} from "$lib/dataqrunch";
    import {DataQrunchClientFactory} from "$lib/client";

    defineCustomElements();

    $: columns = spec.columns.map((x) => {return {prop: x.columnName, name: x.columnName}})
    $: datasetRowObjects = data.rows.map((x:DatasetRow) => {
        let model = {}
        spec.columns.forEach((col,index) => {
            model[col.columnName] = x.data[index];
        });
        return model;
    });
    
    function blankRow(){
        let blankRow = {};
        spec.columns.forEach((col, index) => {
            blankRow[col.columnName] = "";
        });
        return blankRow;
    }
    
    $: source = [...datasetRowObjects, blankRow()]
    
    function onBeforeEdit(e: RevoGridCustomEvent<any>){
        //focus = {x: e.detail.columnIndex, y: e.detail.rowIndex};
        if (e.detail.rowIndex === source.length-1){
            source = [...source, blankRow()]
        }
    }
    
    async function onAfterEdit(e:RevoGridCustomEvent<any>){
        let rowIndex = e.detail.rowIndex;
        let colNames = spec.columns.map((x) => x.columnName);
        let rowDataModel = source[rowIndex];
        let rowData = []
        for (let colname of colNames){
            rowData.push(rowDataModel[colname] ?? "")
        }
        //FIXME: Race condition if spec changes. Get an immutable copy of spec
        let specVersion: OptionalUInt64 = {rowNum: spec.version}
        
        let row: DatasetRow = {
            datasetSpecVersion: specVersion,
            version:
        }
        let client = DataQrunchClientFactory.getClientInstance()
        
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

<RevoGrid {source} {columns} on:beforeedit={onBeforeEdit} on:afteredit={onAfterEdit} rowHeaders=true></RevoGrid>