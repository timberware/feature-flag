<script lang="ts">
  import Container from '$lib/Flag/components/Container.svelte';
  import Cell from '$lib/Flag/components/Cell.svelte';
</script>

<Container>
  <div class="w-1/5">
    <Cell color="text-yellow">Project</Cell>
  </div>
  <div class="w-1/5">
    <Cell color="text-blue">Flag</Cell>
  </div>
  <div class="w-1/5">
    <Cell color="text-red">Type</Cell>
  </div>
  <div class="w-1/5">
    <Cell color="text-green">Value</Cell>
  </div>
  <div class="w-1/5">
    <Cell color="text-turquois">Enabled</Cell>
  </div>
</Container>
