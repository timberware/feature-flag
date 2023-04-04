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
  import Flag from './Flag.svelte';
  import { onMount } from 'svelte';
  import { env } from '$env/dynamic/public';

  let flags: FlagDataType[] = [];
  let stagingFlags: FlagDataType[] = [];
  let productionFlags: FlagDataType[] = [];

  onMount(async () => {
    try {
      const res = await fetch(`${env.PUBLIC_API_URL}:3000/flags/getflags`);
      flags = await res.json();

      flags.forEach(flag => {
        if (flag.environment === 'staging') {
          stagingFlags.push(flag);
        } else {
          productionFlags.push(flag);
        }
      });
    } catch (e) {
      console.error({ e });
    }
    stagingFlags = stagingFlags;
    productionFlags = productionFlags;
  });
</script>

<div class="wrapper">
  <div class="section_header">
    <span class="section">Name</span>
    <span class="section">Type</span>
    <span class="section">Value</span>
    <span class="section">Environment</span>
    <span class="section">State</span>
  </div>
  {#each stagingFlags as flag}
    <Flag flag="{flag}" />
  {/each}
  {#each productionFlags as flag}
    <Flag flag="{flag}" />
  {/each}
</div>
