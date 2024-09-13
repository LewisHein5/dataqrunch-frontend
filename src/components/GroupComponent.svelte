<script lang="ts">
    import type {Group} from "$lib/dataqrunch";
    export let group: Group;
    import {Badge} from "flowbite-svelte";
    import {FolderOutline} from "flowbite-svelte-icons";
</script>

<a href="/groups/{group.id.id}">
    <div class="inline-with-text">
            <span class="icon">
                <FolderOutline/>
            </span>
            <!--TODO refactor into a group name component-->
            {group.name}
            <div>
                <Badge rounded color="pink">Subgroups {group.subgroups.length}</Badge>
                <Badge rounded coler="purple">Datasets {group.datasets.length}</Badge>
            </div>
    </div>
</a>



<style>
    .inline-with-text {
        display: flex;
        align-items: center;
    }

    .inline-with-text:hover {
        display: flex;
        align-items: center;
        background: azure;
    }

    .icon {
        margin-right: 5px;
        color: grey;
    }
    
</style>

