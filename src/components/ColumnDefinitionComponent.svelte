<script lang="ts">
    import {Card, FloatingLabelInput, Label, Select} from "flowbite-svelte";
    export let colName: string;
    export let selected: number;
    export let dataTypesForSelect: {value: number,  name: string}[];
</script>

<Card>
    <Label class="space-y-2">
        <FloatingLabelInput id="columnName" name="Column Name" type="text" bind:value={colName}>Column name</FloatingLabelInput>
    </Label>
    <Label class="space-y-2">
        <Select class="mt-2" items={dataTypesForSelect} bind:value={selected}/>
    </Label>    
</Card>
