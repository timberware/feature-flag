<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Flags from '$lib/Flag/Flags.svelte';
  import type { FlagType } from '../ambient';

  export let data: { flags: FlagType[] };
</script>

<main>
  <Header />
  {#if data?.flags.length}
    <Flags flags="{data.flags}" />
  {/if}
</main>
