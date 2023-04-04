<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 14px 10px;
    border-bottom: 1px solid var(--SLATE_100);
  }

  .section {
    width: 18%;
  }
</style>

<script lang="ts">
  import Button from '$lib/Button/Button.svelte';
  export let flag: FlagDataType;
</script>

<div class="wrapper">
  <div class="section">{flag.name}</div>
  <div class="section">{flag.type}</div>
  <div class="section">{flag.value}</div>
  <div class="section">{flag.environment}</div>
  <div class="section">
    <Button onClick="{() => console.log('Disable button')}">Disable</Button>
    <Button onClick="{() => console.log('Remove button')}" buttonTheme="secondary"
      >Remove</Button
    >
  </div>
</div>
