<style>
  .wrapper {
    position: relative;
    width: 50px;
    height: 30px;
  }

  input {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .thumb-container {
    background-color: var(--theme_unfocused_fg_color);
    border: 0;
    width: 100%;
    height: 100%;
    padding-top: 3px;
    padding-left: 3px;
    border-radius: 100px;
    transition: background-color 0.5s;
  }

  .thumb-container-enabled {
    background-color: var(--GRAPE_700);
  }

  .thumb {
    background-color: var(--text_color);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: 0.5s;
  }

  .thumb-enabled {
    transform: translate(20px);
  }
</style>

<script lang="ts">
  export let isEnabled: boolean = false;
</script>

<div class="wrapper">
  <div class="thumb-container {isEnabled && 'thumb-container-enabled'}">
    <div class="thumb {isEnabled && 'thumb-enabled'}"></div>
  </div>
  <input on:click type="checkbox" id="toggle" name="toggle" checked="{isEnabled}" />
</div>
