<script lang="ts">
    import type {Group} from "$lib/dataqrunch";
    export let group: Group;
    export let expanded: boolean;
    import {Badge, Li, List} from "flowbite-svelte";
    import {FolderOpenOutline, FolderOutline} from "flowbite-svelte-icons";
    import DatasetComponent from "./DatasetComponent.svelte";  
</script>

<div class="group-container">
    <div class="group-name" on:click={() => {expanded = !expanded}}>
        {#if expanded}
            <FolderOpenOutline/>
        {:else}
            <FolderOutline/>    
        {/if}
        <!--TODO refactor into a group name component-->
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
        <!--TODO: Refactor into datasets list component-->
        <List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400" list="none">
            {#each group.datasets as dataset}
                <Li icon><DatasetComponent {dataset}/></Li>
            {/each}
        </List>
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
    
</style>

