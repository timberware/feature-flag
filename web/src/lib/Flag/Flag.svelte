<script lang="ts">
  import type { FlagType } from '../../ambient';
  import Container from '$lib/Flag/components/Container.svelte';
  import Cell from '$lib/Flag/components/Cell.svelte';

  export let flag: FlagType;
</script>

<Container>
  <div class="w-1/5">
    <Cell>{`${flag.project}`}</Cell>
  </div>
  <div class="w-1/5">
    <Cell>{`${flag.name}`}</Cell>
  </div>
  <div class="w-1/5">
    <Cell>{`${flag.type}`}</Cell>
  </div>
  <div class="w-1/5">
    <Cell>{`${flag.value}`}</Cell>
  </div>
  <div class="w-1/5">
    <Cell>{`${flag.isEnabled}`}</Cell>
  </div></Container
>
