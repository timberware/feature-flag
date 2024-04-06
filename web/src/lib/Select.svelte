<script lang="ts">
  type SelectOptionType = {
    name: string;
    val: string;
  };
  export let v: string;
  export let name: string;
  export let items: SelectOptionType[] = [];
  export let placeholder: string;
</script>

<select
  class="text-text px-2 py-1 bg-customGray border border-black rounded-lg focus:ring-red focus:border-yellow"
  bind:value="{v}"
  {name}
>
  <option value="" disabled selected>{placeholder}</option>
  {#each items as { val, name }}
    <option value="{val}">{name}</option>
  {/each}
</select>
