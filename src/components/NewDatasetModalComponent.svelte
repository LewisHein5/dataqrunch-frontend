<script lang="ts">
    import {Button, FloatingLabelInput, Label, Modal} from "flowbite-svelte";
    import {createEventDispatcher} from "svelte";
    import ColumnDefinitionComponent from "./ColumnDefinitionComponent.svelte";
    import {GridPlusOutline} from "flowbite-svelte-icons";

   interface Props {
      open?: boolean;
   }

   let { open = $bindable(false) }: Props = $props();
    let datasetName = $state("")
    let columnDefinitions: ColumnDef[] = $state([])
    let constraints: string[] = []
    
    const dispatch = createEventDispatcher();
    
    function dispatchAccepted(){
        dispatch("accepted", {datasetName: datasetName, columns: columnDefinitions})
    }

</script>


<Modal bind:open={open} size="xs" autoclose={true} class="w-full">
   
    <form class="flex flex-col space-y-6" action="#">
        <Label class="space-y-2">
            <FloatingLabelInput id="columnName" name="Column Name" type="text" bind:value={datasetName}>Name</FloatingLabelInput>
        </Label>
        {#each columnDefinitions as colDef}
            <ColumnDefinitionComponent bind:colName={colDef["columnName"]} bind:selected={colDef["dataType"]}/>
        {/each}
        <Button type="button" on:click={(event) => {event.preventDefault(); event.stopPropagation(); columnDefinitions = [...columnDefinitions, {columnName: "", dataType: -1}]}}><GridPlusOutline/></Button>
        <Button type="submit" class="w-full1" on:click={dispatchAccepted}>Create Dataset</Button>
    </form>
</Modal>
