<script lang="ts">
  import type { FlagType } from '../../ambient';
  import Container from '$lib/Flag/components/Container.svelte';
  import Cell from '$lib/Flag/components/Cell.svelte';

  export let flag: FlagType;
</script>

<Container>
  <Cell>{`${flag.name}`}</Cell>
  <Cell>{`${flag.type}`}</Cell>
  <Cell>{`${flag.value}`}</Cell>
  <Cell>{`${flag.isEnabled}`}</Cell>
</Container>
