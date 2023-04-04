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
  <Button onClick="{() => console.log('All button')}">All</Button>
  <Button onClick="{() => console.log('Staging button')}">Staging</Button>
  <Button onClick="{() => console.log('Production button')}" buttonTheme="secondary"
    >Production</Button
  >
</div>
