import { redirect, error } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request, fetch }: RequestEvent) => {
    const data: FlagType = await request.formData();
    const name = data.get('name') as string;
    const type = data.get('type') as FlatTypes;
    const value = data.get('value') as string;
    const environment = data.get('environment') as string;
    const project = data.get('project') as string;

    let processedValue: FlagValueType;

    if (type === 'number') {
      processedValue = +value;

      if (isNaN(processedValue)) {
        error(400, { message: 'Bad request' });
      }
    }

    if (type === 'boolean') {
      if (value !== 'true' && value !== 'false') {
        error(400, { message: 'Bad request' });
      }

      processedValue = value === 'true';
    }

    const flag = {
      name,
      type,
      value: processedValue,
      environment,
      project
    };

    try {
      const response = await fetch(
        `${process.env.API_HOST || API_HOST || 'http://localhost:3000/flags'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(flag)
        }
      );

      if (response.status !== 201) {
        return;
      }
    } catch (e) {
      console.error(e);
    }

    redirect(302, '/');
  }
};
