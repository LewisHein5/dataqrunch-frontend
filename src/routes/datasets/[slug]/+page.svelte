<script>
    import {
        Breadcrumb, BreadcrumbItem,
        FloatingLabelInput,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from "flowbite-svelte";
    import {ChevronDoubleRightOutline, HomeOutline} from "flowbite-svelte-icons";

    /** @type {import('./$types').PageData} */
    export let data;
    let focus={x:-1, y:-1}
    $: spec = data.dataset.spec[0]
    $: tableSize = {nCols: spec.columns.length, nRows: data.rows.rows.length}
    let rowsWithChanges = new Set()
    
    // For printable characters, if they are typed in the table then the row is changed
    function handleKeyPressInTable(_){
        rowsWithChanges = rowsWithChanges.add(focus.y)
    }
    
    function handleKeyDownInTable(e){
        if (e.keyCode === 9) {
            handleTab(focus.y, focus.x)
        } 
        else if (e.keyCode === 13)
        {
            handleEnter(focus.y, focus.x)
        }
    }
    
    function handleTab(row, col){
        if (col < tableSize.nCols){
            focus = {x: focus.x+1, y: focus.y}
        }
    }
    
    function handleEnter(row, _col) {
        if (row < tableSize.nRows - 1){
            focus = {x:0, y:focus.y+1}
        }
        else if (row === tableSize.nRows - 1){
            data.rows.rows = [...data.rows.rows, {datasetSpecVersion: spec.version, data: spec.columns.map((_)=>{return ""})}]
            focus = {x:0, y:focus.y+1}
        } 
    }
</script>

<Breadcrumb aria-label="Solid background breadcrumb example" class="bg-gray-50 py-3 px-5 dark:bg-gray-900">
    <BreadcrumbItem href="/" home>
        <svelte:fragment slot="icon">
            <HomeOutline class="w-4 h-4 me-2" />
        </svelte:fragment>Home
    </BreadcrumbItem>
    <BreadcrumbItem href="/groups">
        <svelte:fragment slot="icon">
            <ChevronDoubleRightOutline class="w-5 h-5 mx-2 dark:text-white" />
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

<Table striped hoverable>
    <TableHead>
        {#each data.dataset.spec[0].columns as columnSpec}
            <TableHeadCell>{columnSpec.columnName}</TableHeadCell>
        {/each}
    </TableHead>
    <TableBody>
        {#each data.rows.rows as row,y}
            <TableBodyRow>
                {#each row.data as cell, x}
                    <TableBodyCell>
                        <div on:click={(_) => {focus = {x: x,  y: y}}} aria-describedby="Row {y} Column {x}" on:keydown={handleKeyDownInTable}>
                        {#if focus.x === x && focus.y === y}
                            <FloatingLabelInput bind:value={row.data[x]} on:keypress={handleKeyPressInTable} color="blue" style="outlined" id="outlined_success" aria-describedby="outlined_success_help" name="outlined_success" type="text">
                                {spec.columns[x].columnName} ({spec.columns[x].dataTypes})
                            </FloatingLabelInput>
                        {:else}
                            {cell}
                        {/if}
                        <!--<Helper color="green">
                            <span class="font-medium">{data.dataset.spec[0].columns[x].columnName}</span>
                        </Helper>-->
                    </div></TableBodyCell>
                {/each}
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>