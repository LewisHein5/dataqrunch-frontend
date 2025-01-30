<script lang="ts">
    import { run } from 'svelte/legacy';

    import GroupComponent from "../../../components/GroupComponent.svelte";
    /** @type {import('./$types').PageData} */
    import {Breadcrumb, BreadcrumbItem, Li, List, Toolbar, ToolbarButton, Tooltip} from 'flowbite-svelte';
    import DatasetComponent from "../../../components/DatasetNameComponent.svelte";
    import {
        ChevronDoubleRightOutline,
        FileCirclePlusOutline,
        FolderPlusOutline,
        HomeOutline
    } from "flowbite-svelte-icons";
    import NewDatasetModalComponent from "../../../components/NewDatasetModalComponent.svelte";
    import NewGroupModalComponent from "../../../components/NewGroupModalComponent.svelte";
    import type {Dataset, Group} from "$lib/dataqrunch";
    import {DataQrunchClient} from "$lib/dataQrunchClient";
    import {authenticatedToApi} from "../../../store";
    import LoadingComponent from "../../../components/LoadingComponent.svelte";

    interface Props {
        data: {group_id: string};
    }

    let { data }: Props = $props();

    let groups_data_promise: Promise<{groups: Group[], datasets: Dataset[], current_group: Group, types: string[]}> = $state();
    run(() => {
        groups_data_promise;
    });
    authenticatedToApi.subscribe(async (authenticated)=>{
        if (authenticated){
            groups_data_promise = load()
        }
    })

    let showNewDatasetModal = $state(false);
    
    let showNewGroupModal = $state(false);
    

    async function load() {
        let client: DataQrunchClient = new DataQrunchClient();
        let groupId = data.group_id
        let groups = await client.listGroups(groupId);
        let datasets = await client.listDatasets(groupId)
        let current_group = await client.getGroup(groupId)
        let types = await client.listDataTypes();

        return {groups: groups.groups,  datasets: datasets.datasets, current_group, types: types}
    
    }
    
    async function addDataset(event: CustomEvent<{datasetName: string, columns: ColumnDef[]}>){
        let client = new DataQrunchClient()
        await client.createDataset({name: event.detail.datasetName, columns: event.detail.columns, constraints: [], parent_group: (await groups_data_promise).current_group.id}) //todo: constraints
    }
    
    async function addGroup(event: CustomEvent<{groupName: string}>) {
        let client = new DataQrunchClient()
        await client.createGroup({name: event.detail.groupName, parent_group: (await groups_data_promise).current_group.id})
    }
</script>

{#await groups_data_promise}
    <LoadingComponent/>
{:then groups_data}
    {#if groups_data === undefined}
        <LoadingComponent/>
    {:else}
        <Breadcrumb aria-label="Solid background breadcrumb example" class="bg-gray-50 py-3 px-5 dark:bg-gray-900">
            <BreadcrumbItem href="/" home>
                {#snippet icon()}
                            
                        <HomeOutline class="w-4 h-4 me-2"/>
                    
                            {/snippet}
                Home
            </BreadcrumbItem>
            <BreadcrumbItem href="/groups">
                {#snippet icon()}
                            
                        <ChevronDoubleRightOutline class="w-5 h-5 mx-2 dark:text-white"/>
                    
                            {/snippet}
                Datasets
            </BreadcrumbItem>
            <BreadcrumbItem>
                {#snippet icon()}
                            
                        <ChevronDoubleRightOutline class="w-5 h-5 mx-2 dark:text-white" />
                    
                            {/snippet}
                {groups_data.current_group.name}
            </BreadcrumbItem>
        </Breadcrumb>
        <Toolbar>
            <ToolbarButton on:click={() => (showNewDatasetModal=true)} class="toolbar-button"><FileCirclePlusOutline/>New Dataset</ToolbarButton>
            <Tooltip>Add a new dataset</Tooltip>
    
            <ToolbarButton on:click={() => (showNewGroupModal = true)} class="toolbar-button"><FolderPlusOutline/>New Folder</ToolbarButton>
            <Tooltip>Add a new folder</Tooltip>
        </Toolbar>
        <List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400" list="none">
            {#each groups_data.groups as group}
                <Li>
                    <GroupComponent group="{group}"></GroupComponent>
                </Li>
            {/each}
            {#each groups_data.datasets as dataset}
                <Li>
                    <DatasetComponent {dataset}/>
                </Li>
            {/each}
        </List>
        <NewDatasetModalComponent bind:open={showNewDatasetModal} on:accepted={addDataset}/>
        <NewGroupModalComponent bind:open={showNewGroupModal} on:accepted={addGroup}/>
    {/if}
{/await}
