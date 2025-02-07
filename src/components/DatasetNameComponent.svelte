<script lang="ts">
import {FileChartBarOutline} from "flowbite-svelte-icons";

    let { dataset } = $props();
</script>

<a href="/datasets/{dataset.id?.id}">
    <div class="inline-with-text">
        <span class="icon">
            <FileChartBarOutline class="icon"/>    
        </span>
        {dataset.name}
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