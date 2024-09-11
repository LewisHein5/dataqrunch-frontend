<script lang="ts">
    import GroupComponent from "../../components/GroupComponent.svelte";
    /** @type {import('./$types').PageData} */
    export let data;

    import {List, Li, Tooltip, ToolbarButton, Toolbar} from 'flowbite-svelte';
    import DatasetComponent from "../../components/DatasetNameComponent.svelte";
    import {FileCirclePlusOutline} from "flowbite-svelte-icons";
    import NewDatasetModalComponent from "../../components/NewDatasetModalComponent.svelte";
    import {DataQrunchClientFactory} from "$lib/client";
    import {apiKey} from "../../store";

    $: showModal = false;
    
    async function addDataset(event: CustomEvent<{datasetName: string, columnDefinition: ColumnDef[]}>){
        let client = new DataQrunchClientFactory($apiKey).getClientInstance()
        if (client !== undefined){
            //todo: log an error if client is undefined
            await client.createDataset({name: event.detail.datasetName, columns: event.detail.columnDefinition, constraints: []}) //todo: constraints
        }
    }
</script>

<Toolbar>
    <ToolbarButton on:click={() => (showModal=true)} color="blue"><FileCirclePlusOutline/></ToolbarButton>
    <Tooltip>Add a new dataset</Tooltip>
</Toolbar>
<List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400" list="none">
    {#each data.groups as group} 
        <Li>
            <GroupComponent group="{group}" expanded="{false}"></GroupComponent>
        </Li>
    {/each}
    {#each data.datasets as dataset}
        <Li>
            <DatasetComponent {dataset}/>
        </Li>
    {/each}
</List>

<NewDatasetModalComponent bind:open={showModal} on:accepted={addDataset}/>
