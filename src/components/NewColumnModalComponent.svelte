<script lang="ts">
    import {Button, Modal} from "flowbite-svelte";
    import {createEventDispatcher} from "svelte";
    import ColumnDefinitionComponent from "./ColumnDefinitionComponent.svelte";

   interface Props {
      open?: boolean;
   }

   let { open = $bindable(false) }: Props = $props();
    let selected = $state(-1);
   
    let colName = $state("");
   
    

    const dispatch = createEventDispatcher();
    
    
   
    function dispatchAccepted(){
        dispatch("accepted", {columnName: colName, dataType: selected})
    }
    
    export const ssr=false
</script>


<Modal bind:open={open} size="xs" autoclose={true} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
        <ColumnDefinitionComponent bind:colName={colName} bind:selected={selected}/>
        <Button type="submit" class="w-full1" on:click={dispatchAccepted}>Add Column</Button>
    </form>
</Modal>

