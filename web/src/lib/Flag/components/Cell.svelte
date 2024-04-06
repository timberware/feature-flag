<script lang="ts">
  export let color: string = '';
</script>

<div class="{`${color && color} border-black border-l-2 border-solid px-2`}">
  <slot />
</div>
