<script lang="ts">
  import type { FlagType } from '../../ambient';
  import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
  import IconButton from '$lib/IconButton.svelte';
  import Select from '$lib/Select.svelte';
  import Flag from '$lib/Flag/Flag.svelte';
  import MainContainer from '$lib/Flag/components/MainContainer.svelte';
  import Header from '$lib/Flag/components/Header.svelte';
  import FlagTop from '$lib/Flag/FlagTop.svelte';
  import AddFlag from '$lib/Flag/AddFlag.svelte';

  export let flags: FlagType[];

  let selectedProject: string;
  let selectedEnv: string;
  let showModal: boolean;

  const options = [
    { name: 'Staging', val: 'staging' },
    { name: 'Production', val: 'production' }
  ];
</script>

<MainContainer>
  <Header>
    <Select
      name="project"
      items="{options}"
      v="{selectedProject}"
      placeholder="Select Project"
    />
    <Select
      name="environment"
      items="{options}"
      v="{selectedEnv}"
      placeholder="Select Env"
    />
    <IconButton
      on:click="{() => {
        showModal = true;
      }}"
      type="button"
      classes="min-h-full"
      icon="{faPlusCircle}"
    />
  </Header>
  <FlagTop />
  <ul>
    {#each flags as flag (flag.id)}
      <Flag {flag} />
    {/each}
  </ul>
</MainContainer>

<AddFlag bind:showModal />
