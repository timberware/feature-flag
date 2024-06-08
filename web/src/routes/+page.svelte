<script lang="ts">
  import type { ActionResult } from '@sveltejs/kit';
  import { applyAction, enhance } from '$app/forms';
  import { faPlusCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
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

  /** @type {import('./$types').ActionData} */
  export let getForm;

  export let data: { flags: FlagType[]; projects: SelectOptionType[] };
  const { flags, projects } = data;

  const options = [
    { name: 'Staging', val: 'staging' },
    { name: 'Production', val: 'production' }
  ];

  $: displayedFlags = flags;

  const handleForm = ({ formData }: { formData: FormData }) => {
    formData.set('project', selectedProject);
    formData.set('environment', selectedEnv);

    return async ({ result }: { result: ActionResult }) => {
      if (result.type === 'success') {
        const { data } = result;

        if (data?.flags) {
          displayedFlags = data?.flags;
        }
      }
      await applyAction(result);
    };
  };
</script>

<main>
  <form method="POST" action="?/get" bind:this="{getForm}" use:enhance="{handleForm}">
    <input type="hidden" name="environment" />
    <input type="hidden" name="project" />
  </form>
  <Header />
  <MainContainer>
    {#if flags}
      <FlagHeader>
        <div class="flex gap-x-4">
          <div>
            <Select
              on:change="{() => getForm.requestSubmit()}"
              name="project"
              items="{projects}"
              bind:v="{selectedProject}"
              placeholder="Project"
            />
            {#if selectedProject}
              <IconButton
                on:click="{() => {
                  selectedProject = '';
                  getForm.requestSubmit();
                }}"
                type="button"
                icon="{faCircleXmark}"
              />
            {/if}
          </div>
          <div>
            <Select
              on:change="{() => getForm.requestSubmit()}"
              name="environment"
              items="{options}"
              bind:v="{selectedEnv}"
              placeholder="Environment"
            />
            {#if selectedEnv}
              <IconButton
                on:click="{() => {
                  selectedEnv = '';
                  getForm.requestSubmit();
                }}"
                type="button"
                icon="{faCircleXmark}"
              />
            {/if}
          </div>
        </div>
        <IconButton
          on:click="{() => {
            showModal = true;
          }}"
          type="button"
          icon="{faPlusCircle}"
          tooltip="Add a flag"
        />
      </FlagHeader>
      <FlagTop />
      <Flags flags="{displayedFlags}" />
    {/if}
  </MainContainer>
</main>

<AddFlag bind:showModal />
