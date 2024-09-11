<script lang="ts">
    import {Button, FloatingLabelInput, Label, Modal, Spinner} from "flowbite-svelte";
    import {createEventDispatcher} from "svelte";
    import {DataQrunchClientFactory} from "$lib/client";
    import {apiKey} from "../store";
    import ColumnDefinitionComponent from "./ColumnDefinitionComponent.svelte";
    import {GridPlusOutline} from "flowbite-svelte-icons";
    export let open = false
    
    
    let datasetName = ""
    let columnDefinitions: ColumnDef[] = []
    let constraints: string[] = []
    $: dataTypes = [];
    apiKey.subscribe(async () =>{dataTypes = getDataTypes()})

    const dispatch = createEventDispatcher();
    async function getDataTypes(){
        let client = new DataQrunchClientFactory($apiKey).getClientInstance();
        let dataTypes = client !== undefined ? await client.listDataTypes(): [];
        return dataTypes.map((x, i)=>{return {value: i,  name: x}});
    }
    function dispatchAccepted(){
        dispatch("accepted", {datasetName: datasetName, columns: columnDefinitions})
    }

</script>

{#await dataTypes}
    <Spinner/>
{:then dataTypesForSelect}
    <Modal bind:open={open} size="xs" autoclose={true} on:close={() => columnDefinitions = [] } class="w-full">
        <form class="flex flex-col space-y-6" action="#">
            <Label class="space-y-2">
                <FloatingLabelInput id="columnName" name="Column Name" type="text" bind:value={datasetName}>Name</FloatingLabelInput>
            </Label>
            {#each columnDefinitions as colDef}
                <ColumnDefinitionComponent bind:colName={colDef["columnName"]} bind:selected={colDef["dataType"]} dataTypesForSelect="{dataTypesForSelect}"/>
            {/each}
            <Button type="button" on:click={(event) => {event.preventDefault(); event.stopPropagation(); columnDefinitions = [...columnDefinitions, {columnName: "", dataType: -1}]}}><GridPlusOutline/></Button>
            <Button type="submit" class="w-full1" on:click={dispatchAccepted}>Create Dataset</Button>
        </form>
    </Modal>
{:catch error}
    <span class="text-red-700">{error.message}</span>
{/await}