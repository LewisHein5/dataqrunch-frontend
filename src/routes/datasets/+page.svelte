<script>
    import GroupComponent from "$lib/GroupComponent.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
</script>

<ul>
    {#each data.groups as group}
            <li><GroupComponent group="{group}"></GroupComponent></li>
    {/each}
</ul>
