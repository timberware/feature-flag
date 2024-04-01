<script lang="ts">
  import Select from '$lib/Select.svelte';
  import Flag from '$lib/Flag/Flag.svelte';
  import MainContainer from '$lib/Flag/components/MainContainer.svelte';
  import Header from '$lib/Flag/components/Header.svelte';
  import FlagTop from '$lib/Flag/FlagTop.svelte';
  import type { FlagType } from '../../ambient';

  export let flags: FlagType[];

  const options = [
    { name: 'Staging', value: 'staging' },
    { name: 'Production', value: 'production' }
  ];
</script>

<MainContainer>
  <Header>
    <Select items="{options}" placeholder="Select Project" />
    <Select items="{options}" placeholder="Select Env" />
  </Header>
  <FlagTop />
  <ul>
    {#each flags as flag (flag.id)}
      <Flag {flag} />
    {/each}
  </ul>
</MainContainer>
