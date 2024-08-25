<script>
    import GroupComponent from "../../components/GroupComponent.svelte";
    /** @type {import('./$types').PageData} */
    export let data;

    import {List, Li} from 'flowbite-svelte';
        import { sineIn } from 'svelte/easing';
    let hidden1 = false;
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };
</script>

<List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400" list="none">
    {#each data.groups as group}
        <Li>
            <GroupComponent group="{group}" expanded="{false}"></GroupComponent>
        </Li>
    {/each}
</List>
