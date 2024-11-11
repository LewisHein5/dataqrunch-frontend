<script lang="ts">
    import GroupComponent from "../../components/GroupComponent.svelte";
    import {BreadcrumbItem, Li, List, Toolbar, ToolbarButton, Tooltip} from 'flowbite-svelte';
    import DatasetComponent from "../../components/DatasetNameComponent.svelte";
    import {
        ChevronDoubleRightOutline,
        FileCirclePlusOutline,
        FolderPlusOutline,
        HomeOutline
    } from "flowbite-svelte-icons";
    import NewDatasetModalComponent from "../../components/NewDatasetModalComponent.svelte";
    import NewGroupModalComponent from "../../components/NewGroupModalComponent.svelte";
    import {DataQrunchClient} from "$lib/dataQrunchClient";
    import {authenticatedToApi} from "../../store";
    import type {Dataset, Group} from "$lib/dataqrunch";
    import LoadingComponent from "../../components/LoadingComponent.svelte";

    /** @type {import('./$types').PageData} */
    let groups_data: Promise<{groups: Group[], datasets: Dataset[], types: string[]}>;
    $: groups_data;
    const client = new DataQrunchClient()

    $: showNewDatasetModal = false;
    $: showNewGroupModal = false;
    authenticatedToApi.subscribe((x)=>{
        if (x){
            groups_data = load()
        }
    })
    async function load()
    {
        let client = new DataQrunchClient();
        let groups = await client.listGroups(undefined);
        let datasets = await client.listDatasets(undefined)
        let types = await client.listDataTypes();

        return {groups: groups.groups,  datasets: datasets.datasets, types: types}
    }
    
    async function addDataset(event: CustomEvent<{datasetName: string, columns: ColumnDef[]}>){
        await client.createDataset({name: event.detail.datasetName, columns: event.detail.columns, constraints: [], parent_group: undefined})
    }
    
    async function addGroup(event: CustomEvent<{groupName: string}>) {
        await client.createGroup({name: event.detail.groupName, parent_group: undefined});
    }
</script>

{#await groups_data}
    <LoadingComponent/>
{:then data}
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
{/await}
