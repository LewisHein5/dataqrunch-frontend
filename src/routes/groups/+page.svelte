<script lang="ts">
    import GroupComponent from "../../components/GroupComponent.svelte";
    import {Li, List, Toolbar, ToolbarButton, Tooltip} from 'flowbite-svelte';
    import DatasetComponent from "../../components/DatasetNameComponent.svelte";
    import {FileCirclePlusOutline, FolderPlusOutline} from "flowbite-svelte-icons";
    import NewDatasetModalComponent from "../../components/NewDatasetModalComponent.svelte";
    import NewGroupModalComponent from "../../components/NewGroupModalComponent.svelte";
    import {DataQrunchClient} from "$lib/dataQrunchClient";
    import {authenticatedToApi} from "../../store";

    /** @type {import('./$types').PageData} */
    export let data;
    const client = new DataQrunchClient()

    $: showNewDatasetModal = false;
    $: showNewGroupModal = false;
    
    async function addDataset(event: CustomEvent<{datasetName: string, columns: ColumnDef[]}>){
        await client.createDataset({name: event.detail.datasetName, columns: event.detail.columns, constraints: [], parent_group: undefined})
    }
    
    async function addGroup(event: CustomEvent<{groupName: string}>) {
        await client.createGroup({name: event.detail.groupName, parent_group: undefined});
    }
</script>

{#if $authenticatedToApi}
    <Toolbar>
        <ToolbarButton on:click={() => (showNewDatasetModal=true)} class="toolbar-button"><FileCirclePlusOutline/>New Dataset</ToolbarButton>
        <Tooltip>Add a new dataset</Tooltip>
        
        <ToolbarButton on:click={() => (showNewGroupModal = true)} class="toolbar-button"><FolderPlusOutline/>New Folder</ToolbarButton>
        <Tooltip>Add a new folder</Tooltip>
    </Toolbar>
{/if}
    <List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400" list="none">
    {#each data.groups as group} 
        <Li>
            <GroupComponent group="{group}"></GroupComponent>
        </Li>
    {/each}
    {#each data.datasets as dataset}
        <Li>
            <DatasetComponent {dataset}/>
        </Li>
    {/each}
</List>

<NewDatasetModalComponent bind:open={showNewDatasetModal} on:accepted={addDataset} bind:dataTypes={data.types}/>
<NewGroupModalComponent bind:open={showNewGroupModal} on:accepted={addGroup}/>
