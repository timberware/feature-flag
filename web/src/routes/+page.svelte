<script lang="ts">
  import { onMount } from 'svelte';
  import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
  import Header from '$lib/Header.svelte';
  import MainContainer from '$lib/Flag/components/MainContainer.svelte';
  import IconButton from '$lib/IconButton.svelte';
  import Select from '$lib/Select.svelte';
  import FlagHeader from '$lib/Flag/components/Header.svelte';
  import Flags from '$lib/Flag/Flags.svelte';
  import FlagTop from '$lib/Flag/FlagTop.svelte';
  import AddFlag from '$lib/Flag/AddFlag.svelte';
  import type { FlagType, SelectOptionType } from '../ambient';

  let selectedProject: string;
  let selectedEnv: string;
  let showModal: boolean;
  let flags: FlagType[] | null;

  const options = [
    { name: 'Staging', val: 'staging' },
    { name: 'Production', val: 'production' }
  ];

  let projects: SelectOptionType[];
  const getFlags = async () => {
    const newFlags = await fetch(
      `/flags?project=${selectedProject}&environment${selectedEnv}`,
      {
        method: 'GET'
      }
    );

    return await newFlags.json();
  };

  onMount(async () => {
    flags = await getFlags();

    if (flags?.length) {
      const p = [...new Set(flags.map((f: FlagType) => f.project))];
      projects = p.map(pj => ({ name: pj, val: pj }));
    }
  });
</script>

<main>
  <Header />
  <MainContainer>
    {#if flags}
      <FlagHeader>
        <Select
          name="project"
          items="{projects}"
          v="{selectedProject}"
          placeholder="Select Project"
          on:change="{getFlags}"
        />
        <Select
          name="environment"
          items="{options}"
          v="{selectedEnv}"
          placeholder="Select Env"
          on:change="{getFlags}"
        />
        <IconButton
          on:click="{() => {
            showModal = true;
          }}"
          type="button"
          classes="min-h-full"
          icon="{faPlusCircle}"
        />
      </FlagHeader>
      <FlagTop />
      <Flags {flags} />
    {/if}
  </MainContainer>
</main>

<AddFlag bind:showModal />
