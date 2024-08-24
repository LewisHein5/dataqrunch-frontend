<script>
    import GroupComponent from "$lib/GroupComponent.svelte";
    /** @type {import('./$types').PageData} */
    export let data;
    
    import { Drawer, Button, CloseButton } from 'flowbite-svelte';
    import { InfoCircleSolid, ArrowRightOutline } from 'flowbite-svelte-icons';
    import { sineIn } from 'svelte/easing';
    let hidden1 = true;
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };
</script>

<div class="text-center">
    <Button on:click={() => (hidden1 = false)}>Show drawer</Button>
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
    <div class="flex items-center">
        <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
            <InfoCircleSolid class="w-5 h-5 me-2.5" />Info
        </h5>
        <CloseButton on:click={() => (hidden1 = true)} class="mb-4 dark:text-white" />
    </div>
    <ul>
        {#each data.groups as group}
            <li style="list-style-type: none"><GroupComponent group="{group}" expanded="{false}"></GroupComponent></li>
        {/each}
    </ul>

    
    <div class="grid grid-cols-2 gap-4">
        <Button color="light" href="/">Learn more</Button>
        <Button href="/" class="px-4">Get access <ArrowRightOutline class="w-5 h-5 ms-2" /></Button>
    </div>
</Drawer>
