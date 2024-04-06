import { redirect, error } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch }) => {
  let status = 404;

  try {
    const response = await fetch(
      `${process.env.API_HOST || API_HOST || 'http://localhost:3000'}/flags`,
      {
        method: 'GET'
      }
    );
    const flags = await response.json();
    status = response.status;

    return { flags, status };
  } catch (e) {
    console.error(e);
  }
};

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

    try {
      const response = await fetch(
        `${process.env.API_HOST || API_HOST || 'http://localhost:3000/flags'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            type,
            processedValue,
            environment,
            project
          })
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
