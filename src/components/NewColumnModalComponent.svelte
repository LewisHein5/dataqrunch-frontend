<script lang="ts">
    import {Button, Modal, Spinner} from "flowbite-svelte";
    import {createEventDispatcher} from "svelte";
    import {DataQrunchClientFactory} from "$lib/client";
    import {apiKey} from "../store";
    import ColumnDefinitionComponent from "./ColumnDefinitionComponent.svelte";
    export let open = false
    $: selected = -1
    $: colName = ""
    $: dataTypes = [];
    apiKey.subscribe(async () => {dataTypes = await getDataTypes()})

    const dispatch = createEventDispatcher();
    async function getDataTypes(){
        let client = new DataQrunchClientFactory($apiKey).getClientInstance();
        if (client == undefined) {
            return []
        }
        let dataTypes = await client.listDataTypes();
        return dataTypes.map((x, i)=>{return {value: i,  name: x}});
    }
    function dispatchAccepted(){
        dispatch("accepted", {columnName: colName, dataType: selected})
    }
    
    export const ssr=false
</script>

{#await dataTypes}
    <Spinner/>
{:then dataTypesForSelect}
    <Modal bind:open={open} size="xs" autoclose={true} class="w-full">
        <form class="flex flex-col space-y-6" action="#">
            <ColumnDefinitionComponent bind:colName={colName} bind:selected={selected} dataTypesForSelect="{dataTypesForSelect}"/>
            <Button type="submit" class="w-full1" on:click={dispatchAccepted}>Add Column</Button>
        </form>
    </Modal>
{:catch error}
    <span class="text-red-700">{error.message}</span>
{/await}
