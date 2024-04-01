<script lang="ts">
  export let color: string = '';
</script>

<div class="{`w-1/4 ${color && color} border-black border-l-2 border-solid px-2`}">
  <slot />
</div>
