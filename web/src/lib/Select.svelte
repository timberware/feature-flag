<script lang="ts">
  type SelectOptionType = {
    name: string;
    value: string;
  };
  export let value: string = '';
  export let items: SelectOptionType[] = [];
  export let placeholder: string = 'Choose option';
</script>

<select
  class="text-text px-2 py-1 bg-customGray border border-black rounded-lg focus:ring-red focus:border-yellow"
  bind:value
  on:change
  on:contextmenu
  on:input
>
  <option disabled selected value="">{placeholder}</option>
  {#each items as { value, name }}
    <option {value}>{name}</option>
  {/each}
</select>
