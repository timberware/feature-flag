<style>
  div {
    padding: 14px 10px;
    border-bottom: 1px solid var(--GRAPE_700);
  }
</style>

<script>
  import Button from '$lib/Button/Button.svelte';
</script>

<div>
  <Button on:click="{() => console.log('All button')}">All</Button>
  <Button on:click="{() => console.log('Staging button')}">Staging</Button>
  <Button on:click="{() => console.log('Production button')}" buttonTheme="secondary"
    >Production</Button
  >
</div>
