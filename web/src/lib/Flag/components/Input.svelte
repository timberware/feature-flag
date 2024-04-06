<script lang="ts">
  import Cell from '$lib/Flag/components/Cell.svelte';

  export let labelName: string;
  export let inputName: string;
  export let value: string;
  export let color: string;
  export let placeholder: string = '';
</script>

<div class="flex my-6">
  <div class="w-1/2">
    <Cell {color}>{labelName}</Cell>
  </div>
  <input
    class="w-1/2 pl-1"
    required
    type="text"
    name="{inputName}"
    bind:value
    {placeholder}
  />
</div>
