<style lang="postcss">
  :global(html) {
    background-color: theme(colors.background);
    color: theme(colors.text);
  }
</style>

<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import Container from '$lib/Container.svelte';

  const extractTitle = (pathname: string) => pathname.replace('/user', '');
</script>

<svelte:head>
  <title>{`Feature Flag - ${extractTitle($page.url.pathname)}`}</title>
</svelte:head>

<Container>
  <slot />
</Container>
