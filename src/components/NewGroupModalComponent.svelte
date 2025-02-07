<script lang="ts">
    import {Button, Card, FloatingLabelInput, Label, Modal} from "flowbite-svelte";
    import {createEventDispatcher} from "svelte";

   interface Props {
      open?: boolean;
   }

   let { open = $bindable(false) }: Props = $props();
    let groupName = $state("");
   

    const dispatch = createEventDispatcher();
   
    function dispatchAccepted(){
        dispatch("accepted", {groupName: groupName})
    }

    export const ssr=false
</script>


<Modal bind:open={open} size="xs" autoclose={true} class="w-full">
    <form class="flex flex-col space-y-6" action="#">
        <Card>
            <Label class="space-y-2">
                <FloatingLabelInput id="groupName" name="Folder Name" type="text" bind:value={groupName}>Folder name</FloatingLabelInput>
            </Label>
            <Button type="submit" class="w-full1" on:click={dispatchAccepted}>Add Folder</Button>
        </Card>
    </form>
</Modal>
