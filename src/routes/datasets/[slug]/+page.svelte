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
                        <div on:click={(event) => {focus = {x: x,  y: y}; console.log(focus)}} aria-describedby="Row {y} Column {x}" on:keydown={(e) => {if (e.keyCode === 9){ focus = {x: focus.x+1, y: focus.y}}}}>
                        {#if focus.x === x && focus.y === y}
                            <FloatingLabelInput color="blue" style="outlined" id="outlined_success" aria-describedby="outlined_success_help" name="outlined_success" type="text">
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