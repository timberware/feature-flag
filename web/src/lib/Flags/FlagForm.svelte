<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    padding: 14px 10px;
    border-bottom: 1px solid var(--SLATE_100);
  }

  .section {
    width: 18%;
  }
</style>

<script lang="ts">
  import Toggle from '$lib/Toggle/Toggle.svelte';
  import DropDown from '$lib/DropDown/DropDown.svelte';

  let name: string = '';
  // let type: FlagType = 'string';
  // let value: FlagValueType = '';
  // let environment: FlagEnv = 'staging';
  let isEnabled: boolean = true;
</script>

<div class="wrapper">
  <div class="section"><input type="text" bind:value="{name}" /></div>
  <div class="section">
    <DropDown
      data="{[
        { name: 'string', value: 'string' },
        { name: 'boolean', value: 'boolean' },
        { name: 'number', value: 'number' }
      ]}"
    />
  </div>
  <div class="section">field</div>
  <DropDown
    data="{[
      { name: 'Staging', value: 'staging' },
      { name: 'Production', value: 'production' }
    ]}"
  />
  <div class="section">
    <Toggle
      isEnabled="{isEnabled}"
      on:click="{() => {
        isEnabled = !isEnabled;
        console.log(`this is status: ${isEnabled}`);
      }}"
    />
  </div>
</div>
