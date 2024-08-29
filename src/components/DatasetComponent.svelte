<script>
import {FileChartBarOutline} from "flowbite-svelte-icons";

export let dataset
</script>

<FileChartBarOutline/><a href="/datasets/{dataset.id?.id}">{dataset.name}</a>