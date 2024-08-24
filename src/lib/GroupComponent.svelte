<script lang="ts">
    import type {Group} from "$lib/dataqrunch";
    export let group: Group;
    export let expanded: boolean;
    import {Badge, Indicator, Li, List} from "flowbite-svelte";
    import {FileChartBarOutline, FolderOpenOutline, FolderOutline} from "flowbite-svelte-icons";  
</script>

<div class="group-container">
    <div class="group-name" on:click={() => {expanded = !expanded}}>
        {#if expanded}
            <FolderOpenOutline/>
        {:else}
            <FolderOutline/>    
        {/if}
        {group.name}
        <div>
            <Badge rounded color="pink">Subgroups {group.subgroups.length}</Badge>
            <Badge rounded coler="purple">Datasets {group.datasets.length}</Badge>
        </div>
        
    </div>
    {#if expanded}
        <List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400" list="none">
            {#each group.subgroups as subgroup}
                <Li>
                    <svelte:self group="{subgroup}" expanded="{false}"></svelte:self>
                </Li>
            {/each}
        </List>
        <List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400" list="none">
            {#each group.datasets as dataset}
                <Li icon><FileChartBarOutline/>{dataset.name}</Li>
            {/each}
        </List>
        <ul class="dataset-list">
            
        </ul>
    {/if}
</div>


<style>
    .group-container {
        margin-left: min(10px, 20%);
    }

    .group-name {
        font-size: 1rem;
        font-weight: normal;
        margin-bottom: 5px;
        cursor: pointer;
    }

    .dataset-list {
        list-style-type: none;
        padding-left: min(10px, 20%);
        border-left: 1px solid #ccc;
        margin-left: 10px;
    }
    
</style>

