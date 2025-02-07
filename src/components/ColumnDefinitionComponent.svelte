<script lang="ts">
    import { run } from 'svelte/legacy';

    import {Card, FloatingLabelInput, Label, Select} from "flowbite-svelte";
    import {DataQrunchClient} from "$lib/dataQrunchClient";
    import {authenticatedToApi} from "../store";
    import LoadingComponent from "./LoadingComponent.svelte";
    interface Props {
        colName: string;
        selected: number;
    }

    let { colName = $bindable(), selected = $bindable() }: Props = $props();

    let dataTypesPromise: Promise<string[]> = $state();
    run(() => {
        dataTypesPromise
    });

    
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
