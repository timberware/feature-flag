<style>
  button {
    font-size: 16px;
    padding: 0 6px 4px;
    border: 0;
  }

  .primary {
    border-bottom: 1px solid var(--BANANA_500);
  }
  .secondary {
    border-bottom: 1px solid var(--STRAWBERRY_500);
  }
</style>

<script lang="ts">
  export let onClick: svelte.JSX.MouseEventHandler<HTMLButtonElement>;
  export let buttonTheme: ThemeVariant = 'primary';
</script>

<button on:click="{onClick}" class="{buttonTheme}"><slot /></button>
