<script lang="ts">
  export let data: { name: string; value: string }[] = [];
</script>

<select name="dropdown" id="dropdown">
  {#each data as { value, name }}
    <option value="{value}">{name}</option>
  {/each}
</select>
