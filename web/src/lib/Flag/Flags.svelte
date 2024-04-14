<script lang="ts">
  import type { FlagType } from '../../ambient';
  import Flag from '$lib/Flag/Flag.svelte';

  export let flags: FlagType[];
</script>

<ul>
  {#each flags as flag (flag.id)}
    <Flag {flag} />
  {/each}
</ul>
