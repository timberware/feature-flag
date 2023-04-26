<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: 14px 10px;
    border-bottom: 1px solid var(--SLATE_100);
  }

  .section {
    width: 18%;
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>

<script lang="ts">
  import { env } from '$env/dynamic/public';
  import Button from '$lib/Button/Button.svelte';
  import Toggle from '$lib/Toggle/Toggle.svelte';
  export let flag: FlagDataType;

  const handleClick = async () => {
    try {
      const res = await fetch(`${env.PUBLIC_API_URL}:3000/flags/setEnabled`, {
        method: 'PATCH',
        body: JSON.stringify({
          id: flag.id,
          isEnabled: !flag.isEnabled
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });

      const { _id, isEnabled } = await res.json();

      if (res.status === 200) {
        flag = {
          ...flag,
          id: _id,
          isEnabled
        };
      }
    } catch (e) {
      console.error({ e });
    }
  };
</script>

<div class="wrapper">
  <div class="section">{flag.name}</div>
  <div class="section">{flag.type}</div>
  <div class="section">{flag.value}</div>
  <div class="section">{flag.environment}</div>
  <div class="section button-wrapper">
    <Toggle isEnabled="{flag?.isEnabled}" on:click="{handleClick}" />
    <Button on:click="{() => console.log('Remove button')}" buttonTheme="secondary"
      >Remove</Button
    >
  </div>
</div>
