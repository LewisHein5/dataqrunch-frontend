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
        margin-left: 20px;
    }

    .group-name {
        font-size: 1rem;
        font-weight: normal;
        margin-bottom: 5px;
        cursor: pointer;
    }

    .dataset-list, .subgroups-list {
        list-style-type: none;
        padding-left: 20px;
        border-left: 1px solid #ccc;
        margin-left: 10px;
    }

    .dataset-item, .subgroups-item {
        padding: 2px 0;
    }

    .subgroups-item .group-container {
        margin-left: 0;
    }

    .subgroups-item .group-name {
        font-weight: bold;
    }
</style>

