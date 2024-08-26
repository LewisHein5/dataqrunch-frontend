<script lang="ts">
    import {
        Breadcrumb, BreadcrumbItem,
    } from "flowbite-svelte";
    import {ChevronDoubleRightOutline, HomeOutline} from "flowbite-svelte-icons";

    /** @type {import('./$types').PageData} */
    export let data;
    let focus = {x: -1, y: -1}
    $: spec = data.dataset.spec[0] as DatasetSpec;
    $: tableSize = {nCols: spec.columns.length, nRows: data.rows.rows.length}
    let rowsWithChanges = new Set()
    
    import {RevoGrid} from '@revolist/svelte-datagrid';

    // This part to makesure revogrid component is loaded and ready
    import {defineCustomElements} from '@revolist/revogrid/loader';
    import {type DatasetRow, DatasetSpec} from "$lib/dataqrunch";

    defineCustomElements();

    $: columns = spec.columns.map((x) => {return {prop: x.columnName, name: x.columnName}})
    $: source = data.rows.rows.map((x:DatasetRow) => {
        let model = {}
        spec.columns.forEach((col,index) => {
            model[col.columnName] = x.data[index];
        });
        return model;
    });
    
    
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

<RevoGrid {source} {columns} rowHeaders="{true}"></RevoGrid>