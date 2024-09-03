<script lang="ts">
    import {Button, FloatingLabelInput, Label, Modal, Select, Spinner} from "flowbite-svelte";
    import {createEventDispatcher} from "svelte";
    import {DataQrunchClientFactory} from "$lib/client";
    export let open = false
    $: selected = -1
    $: colName = ""
    let client = DataQrunchClientFactory.getClientInstance();
    let dataTypes = getDataTypes();

    const dispatch = createEventDispatcher();
    async function getDataTypes(){
        let dataTypes = await client.listDataTypes();
        return dataTypes.map((x, i)=>{return {value: i,  name: x}});
    }
    function onCreateColumn(){
        dispatch("accepted", {columnName: colName, dataType: selected})
    }
    
</script>

{#await dataTypes}
    <Spinner/>
{:then dataTypesForSelect}
    <Modal bind:open={open} size="xs" autoclose={true} class="w-full">
        <form class="flex flex-col space-y-6" action="#">
            <Label class="space-y-2">
                <FloatingLabelInput style="outlined" id="columnName" name="Column Name" type="text" bind:value={colName}>Column name</FloatingLabelInput>
            </Label>
            <Label class="space-y-2">
                <Select class="mt-2" items={dataTypesForSelect} bind:value={selected}/>
            </Label>
            <Button type="submit" class="w-full1" on:click={onCreateColumn}>Add Column</Button>
        </form>
    </Modal>
{:catch error}
    <span class="text-red-700">{error.message}</span>
{/await}
