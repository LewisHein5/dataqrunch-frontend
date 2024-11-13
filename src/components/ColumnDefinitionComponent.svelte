<script lang="ts">
    import {Card, FloatingLabelInput, Label, Select} from "flowbite-svelte";
    import {DataQrunchClient} from "$lib/dataQrunchClient";
    import {authenticatedToApi} from "../store";
    import LoadingComponent from "./LoadingComponent.svelte";
    export let colName: string;
    export let selected: number;

    let dataTypesPromise: Promise<string[]>;
    $: dataTypesPromise

    
    async function load(){
        let client = new DataQrunchClient();
        return await client.listDataTypes();
    }

    authenticatedToApi.subscribe((authenticated)=>{
        if (authenticated){
            dataTypesPromise = load()
        }
    })

</script>

{#await dataTypesPromise}
    loading...
{:then dataTypes}
    {#if dataTypes === undefined}
        <LoadingComponent/>
    {:else }
        <Card>
        <Label class="space-y-2">
            <FloatingLabelInput id="columnName" name="Column Name" type="text" bind:value={colName}>Column name</FloatingLabelInput>
        </Label>
        <Label class="space-y-2">
            <Select class="mt-2" items={dataTypes.map((x, i)=>{return {value: i,  name: x}})} bind:value={selected}/>
        </Label>    
        </Card>
    {/if}
{/await}
