<style>
  .wrapper {
    padding: 14px 10px;
  }

  .section_header {
    display: flex;
    border-bottom: 1px solid var(--MINT_900);
    justify-content: space-between;
    padding: 14px 10px;
  }

  .section {
    width: 18%;
  }
</style>

<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { onMount } from 'svelte';
  import Flag from './Flag.svelte';
  import FlagForm from './FlagForm.svelte';

  let stagingFlags: FlagDataType[] = [];
  let productionFlags: FlagDataType[] = [];

  const sectionHeaders = ['Name', 'Type', 'Value', 'Environment', 'Status'];

  onMount(async () => {
    try {
      const res = await fetch(`${env.PUBLIC_API_URL}:3000/flags/getflags`);
      const flags: FlagDataType[] = await res.json();

      flags.forEach(flag => {
        if (flag.environment === 'staging') {
          stagingFlags.push(flag);
        } else {
          productionFlags.push(flag);
        }
      });
      stagingFlags = stagingFlags;
      productionFlags = productionFlags;
    } catch (e) {
      console.error({ e });
    }
  });
</script>

<div class="wrapper">
  <div class="section_header">
    {#each sectionHeaders as section}
      <span class="section">{section}</span>
    {/each}
  </div>
  <FlagForm />
  {#each stagingFlags as flag (flag.id)}
    <Flag flag="{flag}" />
  {/each}
  {#each productionFlags as flag (flag.id)}
    <Flag flag="{flag}" />
  {/each}
</div>
