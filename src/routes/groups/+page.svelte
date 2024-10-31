<script lang="ts">
    import GroupComponent from "../../components/GroupComponent.svelte";
    import {Li, List, Toolbar, ToolbarButton, Tooltip} from 'flowbite-svelte';
    import DatasetComponent from "../../components/DatasetNameComponent.svelte";
    import {FileCirclePlusOutline, FolderPlusOutline} from "flowbite-svelte-icons";
    import NewDatasetModalComponent from "../../components/NewDatasetModalComponent.svelte";
    import NewGroupModalComponent from "../../components/NewGroupModalComponent.svelte";

    /** @type {import('./$types').PageData} */
    export let data;

    $: showNewDatasetModal = false;
    $: showNewGroupModal = false;
    
    async function addDataset(event: CustomEvent<{datasetName: string, columns: ColumnDef[]}>){
        await fetch("/datasets", {method: "POST", body: JSON.stringify({name: event.detail.datasetName, columns: event.detail.columns, constraints: [], parent_group: undefined})});
    }
    
    async function addGroup(event: CustomEvent<{groupName: string}>) {
        //TODO: Use a service layer
        await fetch("/groups", {method: "POST", body: JSON.stringify({name: event.detail.groupName, parent_group: undefined})});
    }
</script>

<Toolbar>
    <ToolbarButton on:click={() => (showNewDatasetModal=true)} class="toolbar-button"><FileCirclePlusOutline/>New Dataset</ToolbarButton>
    <Tooltip>Add a new dataset</Tooltip>
    
    <ToolbarButton on:click={() => (showNewGroupModal = true)} class="toolbar-button"><FolderPlusOutline/>New Folder</ToolbarButton>
    <Tooltip>Add a new folder</Tooltip>
</Toolbar>
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
