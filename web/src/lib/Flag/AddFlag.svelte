<script lang="ts">
  import { invalidate } from '$app/navigation';
  import Input from '$lib/Flag/components/Input.svelte';
  import Select from '$lib/Select.svelte';
  import Cell from '$lib/Flag/components/Cell.svelte';
  import Modal from '$lib/Modal.svelte';
  import { applyAction, enhance } from '$app/forms';

  const options = [
    { name: 'String', val: 'string' },
    { name: 'Number', val: 'number' },
    { name: 'Boolean', val: 'boolean' }
  ];
  export let shouldShowModal: boolean;
  let name: string;
  let type: string;
  let value: string;
  let environment: string;
  let project: string;
</script>

<Modal bind:showModal="{shouldShowModal}">
  <div class="rounded-xl bg-background p-8 mx-auto">
    <form
      method="POST"
      action="?/create"
      use:enhance="{() => {
        return async ({ result }) => {
          if (result.type === 'success') {
            invalidate('/');
            shouldShowModal = false;
          }
          await applyAction(result);
        };
      }}"
    >
      <div class="w-96 bg-background rounded-md">
        <Input
          labelName="Name"
          inputName="name"
          value="{name}"
          color="text-blue"
          placeholder="Exit button"
        />
        <div class="flex my-6">
          <div class="w-1/2">
            <Cell color="text-red">Type</Cell>
          </div>
          <Select name="type" items="{options}" v="{type}" placeholder="Select Type" />
        </div>
        <Input
          labelName="Value"
          inputName="value"
          {value}
          color="text-green"
          placeholder="true"
        />
        <Input
          labelName="Environment"
          inputName="environment"
          value="{environment}"
          color="text-turquois"
          placeholder="staging"
        />
        <Input
          labelName="Project"
          inputName="project"
          value="{project}"
          color="text-pink"
          placeholder="Color Picker"
        />
      </div>
      <div class="flex pt-5 justify-around text-text">
        <button type="submit">Create Flag</button>
      </div>
    </form>
  </div>
</Modal>
