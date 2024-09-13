<script lang="ts">
    import GroupComponent from "../../../components/GroupComponent.svelte";
    /** @type {import('./$types').PageData} */
    export let data: {groups: Group[], datasets: Dataset[], current_group: Group};

    import {List, Li, Tooltip, ToolbarButton, Toolbar, BreadcrumbItem, Breadcrumb} from 'flowbite-svelte';
    import DatasetComponent from "../../../components/DatasetNameComponent.svelte";
    import {
        ChevronDoubleRightOutline,
        FileCirclePlusOutline,
        FolderPlusOutline,
        HomeOutline
    } from "flowbite-svelte-icons";
    import NewDatasetModalComponent from "../../../components/NewDatasetModalComponent.svelte";
    import {DataQrunchClientFactory} from "$lib/client";
    import {apiKey} from "../../../store";
    import NewGroupModalComponent from "../../../components/NewGroupModalComponent.svelte";
    import type {Dataset, Group} from "$lib/dataqrunch";

    $: showNewDatasetModal = false;
    $: showNewGroupModal = false;
    
    async function addDataset(event: CustomEvent<{datasetName: string, columns: ColumnDef[]}>){
        let client = new DataQrunchClientFactory($apiKey).getClientInstance()
        if (client !== undefined){
            //todo: log an error if client is undefined
            await client.createDataset({name: event.detail.datasetName, columns: event.detail.columns, constraints: [], parent_group: data.current_group.id}) //todo: constraints
        }
    }
    
    async function addGroup(event: CustomEvent<{groupName: string}>) {
        let client = new DataQrunchClientFactory($apiKey).getClientInstance()
        if (client !== undefined){
            //Todo
            await client.createGroup({name: event.detail.groupName, parent_group: data.current_group.id})
        }
    }
</script>


<Breadcrumb aria-label="Solid background breadcrumb example" class="bg-gray-50 py-3 px-5 dark:bg-gray-900">
    <BreadcrumbItem href="/" home>
        <svelte:fragment slot="icon">
            <HomeOutline class="w-4 h-4 me-2"/>
        </svelte:fragment>
        Home
    </BreadcrumbItem>
    <BreadcrumbItem href="/groups">
        <svelte:fragment slot="icon">
            <ChevronDoubleRightOutline class="w-5 h-5 mx-2 dark:text-white"/>
        </svelte:fragment>
        Datasets
    </BreadcrumbItem>
    <BreadcrumbItem>
        <svelte:fragment slot="icon">
            <ChevronDoubleRightOutline class="w-5 h-5 mx-2 dark:text-white" />
        </svelte:fragment>
        {data.current_group.name}
    </BreadcrumbItem>
</Breadcrumb>
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

<NewDatasetModalComponent bind:open={showNewDatasetModal} on:accepted={addDataset}/>
<NewGroupModalComponent bind:open={showNewGroupModal} on:accepted={addGroup}/>
