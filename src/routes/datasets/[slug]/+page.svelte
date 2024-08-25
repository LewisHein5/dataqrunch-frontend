<script>
    import {
        FloatingLabelInput, 
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell
    } from "flowbite-svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    let focus={x:-1, y:-1}
    let tableSize = {nCols: data.dataset.spec[0].columns.length, nRows: data.rows.rows.length}
    
    function handleKeyPressInTable(e){
        if (e.keyCode === 9) {
            handleTab(focus.y, focus.x)
        } 
        if (e.keyCode === 13)
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
            let spec = data.dataset.spec[0];
            data.rows.rows = [...data.rows.rows, {datasetSpecVersion: spec.version, data: spec.columns.map((_)=>{return ""})}]
            focus = {x:0, y:focus.y+1}
        } 
    }
</script>

<h1>{data.dataset.name}</h1>

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
                        <div on:click={(_) => {focus = {x: x,  y: y}}} aria-describedby="Row {y} Column {x}" on:keydown={handleKeyPressInTable}>
                        {#if focus.x === x && focus.y === y}
                            <FloatingLabelInput bind:value={row.data[x]} color="blue" style="outlined" id="outlined_success" aria-describedby="outlined_success_help" name="outlined_success" type="text">
                                {data.dataset.spec[0].columns[x].columnName} ({data.dataset.spec[0].columns[x].dataTypes})
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