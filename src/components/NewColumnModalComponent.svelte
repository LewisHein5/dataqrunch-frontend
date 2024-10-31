<script lang="ts">
    import {Button, Modal} from "flowbite-svelte";
    import {createEventDispatcher} from "svelte";
    import ColumnDefinitionComponent from "./ColumnDefinitionComponent.svelte";

    export let open = false
    export let dataTypes: string[] = [];
    $: selected = -1
    $: colName = ""
    

    const dispatch = createEventDispatcher();
    
    
   
    function dispatchAccepted(){
        dispatch("accepted", {columnName: colName, dataType: selected})
    }
    
    export const ssr=false
</script>


<Modal bind:open={open} size="xs" autoclose={true} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
        <ColumnDefinitionComponent bind:colName={colName} bind:selected={selected} dataTypes="{dataTypes}"/>
        <Button type="submit" class="w-full1" on:click={dispatchAccepted}>Add Column</Button>
    </form>
</Modal>

