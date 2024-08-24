<script>
    import {Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell} from "flowbite-svelte";

/** @type {import('./$types').PageData} */
export let data;
</script>

<h1>{data.dataset.name}</h1>

<Table>
    <TableHead>
        {#each data.dataset.spec[0].columns as columnSpec}
            <TableHeadCell>{columnSpec.columnName}</TableHeadCell>
        {/each}
    </TableHead>
    <TableBody>
        {#each data.rows.rows as row}
            <TableBodyRow>
                {#each row.data as cell}
                    <TableBodyCell>{cell}</TableBodyCell>
                {/each}
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>