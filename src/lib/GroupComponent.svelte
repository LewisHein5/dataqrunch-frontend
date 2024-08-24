<script lang="ts">
    import type {Group} from "$lib/dataqrunch";
    export let group: Group;
    export let expanded: boolean;
    import Icon from "@iconify/svelte";  
</script>

<div class="group-container">
    <div class="group-name" on:click={() => {expanded = !expanded}}>
        {#if expanded}
            <Icon icon="ph:folder-open-bold"/>
        {:else}
            <Icon icon="ph:folder-bold" />    
        {/if}
        {group.name}
    </div>
    {#if expanded}
        <ul class="subgroups-list">
            {#each group.subgroups as subgroup}
                <li class="subgroups-item"><svelte:self group="{subgroup}" expanded="{false}"></svelte:self></li>
            {/each}
        </ul>
        <ul class="dataset-list">
            {#each group.datasets as dataset}
                <li class="dataset-item"><Icon icon="ph:file-bold" />{dataset.name}</li>
            {/each}
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

    .dataset-list, .subgroups-list {
        list-style-type: none;
        padding-left: min(10px, 20%);
        border-left: 1px solid #ccc;
        margin-left: 10px;
    }

    .dataset-item, .subgroups-item {
        padding: 2px 0;
        list-style-type: none;
    }
</style>

