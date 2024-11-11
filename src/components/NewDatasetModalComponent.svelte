<script lang="ts">
    import {Button, FloatingLabelInput, Label, Modal} from "flowbite-svelte";
    import {createEventDispatcher} from "svelte";
    import ColumnDefinitionComponent from "./ColumnDefinitionComponent.svelte";
    import {GridPlusOutline} from "flowbite-svelte-icons";
    import {DataQrunchClient} from "$lib/dataQrunchClient";
    import {authenticatedToApi} from "../store";

    export let open = false
    let dataTypesPromise: Promise<string[]>;
    $: dataTypesPromise
    
    let datasetName = ""
    let columnDefinitions: ColumnDef[] = []
    let constraints: string[] = []
    async function load(){
        let client = new DataQrunchClient();
        return await client.listDataTypes();
    }
    
    authenticatedToApi.subscribe((authenticated)=>{
        if (authenticated){
            dataTypesPromise = load()
        }
    })    

    const dispatch = createEventDispatcher();
    
    function dispatchAccepted(){
        dispatch("accepted", {datasetName: datasetName, columns: columnDefinitions})
    }

</script>


<Modal bind:open={open} size="xs" autoclose={true} class="w-full">
    {#await dataTypesPromise}
    	loading...
    {:then dataTypes}
        <form class="flex flex-col space-y-6" action="#">
            <Label class="space-y-2">
                <FloatingLabelInput id="columnName" name="Column Name" type="text" bind:value={datasetName}>Name</FloatingLabelInput>
            </Label>
            {#each columnDefinitions as colDef}
                <ColumnDefinitionComponent bind:colName={colDef["columnName"]} bind:selected={colDef["dataType"]} dataTypes={dataTypes}/>
            {/each}
            <Button type="button" on:click={(event) => {event.preventDefault(); event.stopPropagation(); columnDefinitions = [...columnDefinitions, {columnName: "", dataType: -1}]}}><GridPlusOutline/></Button>
            <Button type="submit" class="w-full1" on:click={dispatchAccepted}>Create Dataset</Button>
        </form>
    {/await}
</Modal>
