<script lang="ts">
    import type {Group} from "$lib/dataqrunch";

    export let group: Group;
</script>

<div class="group-container">
    <div class="group-name">{group.name}</div>
    <ul class="subgroups-list">
        {#each group.subgroups as subgroup}
            <li class="subgroups-item"><svelte:self group="{subgroup}"></svelte:self></li>
        {/each}
    </ul>
    <ul class="dataset-list">
        {#each group.datasets as dataset}
            <li class="dataset-item">{dataset}</li>
        {/each}
    </ul>
</div>

<style>
    .group-container {
        margin: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .group-name {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .dataset-list {
        list-style-type: none;
        padding-left: 0;
    }
    
    .dataset-item {
        padding: 5px 0;
    }

    .subgroups-list {
        list-style-type: none;
        padding-left: 0;
    }
    
    .subgroups-item{
        padding: 5px 0;
    }
</style>

