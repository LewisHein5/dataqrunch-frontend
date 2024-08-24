<script>
    import GroupComponent from "$lib/GroupComponent.svelte";
    /** @type {import('./$types').PageData} */
    export let data;

    import {Drawer, Button, CloseButton, NavHamburger, List, Li} from 'flowbite-svelte';
    import { InfoCircleSolid, ArrowRightOutline } from 'flowbite-svelte-icons';
    import { sineIn } from 'svelte/easing';
    let hidden1 = false;
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };
</script>

<div class="text-left">
    <Button on:click={() => (hidden1 = false)}><NavHamburger/></Button>
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
    <div class="flex items-center">
        <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
            <InfoCircleSolid class="w-5 h-5 me-2.5" />Info
        </h5>
        <CloseButton on:click={() => (hidden1 = true)} class="mb-4 dark:text-white" />
    </div>
    <List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400" list="none">
        {#each data.groups as group}
            <Li>
                <GroupComponent group="{group}" expanded="{false}"></GroupComponent>
            </Li>
        {/each}
    </List>
</Drawer>
