<script lang="ts">
    import {Card, FloatingLabelInput, Label, Select} from "flowbite-svelte";
    export let colName: string;
    export let selected: number;
    export let dataTypes: string[];
</script>

<Card>
    <Label class="space-y-2">
        <FloatingLabelInput id="columnName" name="Column Name" type="text" bind:value={colName}>Column name</FloatingLabelInput>
    </Label>
    <Label class="space-y-2">
        <Select class="mt-2" items={dataTypes.map((x, i)=>{return {value: i,  name: x}})} bind:value={selected}/>
    </Label>    
</Card>
