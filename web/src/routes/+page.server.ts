import { redirect, error, fail } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';
import type { RequestEvent } from './$types';
import type { FlagType, FlagTypes, FlagValueType, SelectOptionType } from '../ambient';

const API_URL = `${process.env.API_HOST || API_HOST || 'http://localhost:3000/flags'}`;

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch }) => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET'
    });

    if (response.status !== 200) {
      return;
    }
    const flags: FlagType[] = await response.json();

    const projectNames = [...new Set(flags.map((f: FlagType) => f.project))];
    const projects: SelectOptionType[] = projectNames.map(pj => ({ name: pj, val: pj }));

    return { flags, projects };
  } catch (e) {
    console.error(e);
  }
};

/** @type {import('./$types').Actions} */
export const actions = {
  create: async ({ request, fetch }: RequestEvent) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const type = data.get('type') as FlagTypes;
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
      const response = await fetch(API_HOST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(flag)
      });

      if (response.status !== 201) {
        return;
      }
    } catch (e) {
      console.error(e);
    }

    redirect(302, '/');
  },
  get: async ({ request, fetch }: RequestEvent) => {
    const data = await request.formData();
    const project = data.get('project') as string;
    const environment = data.get('environment') as string;

    let queryParams = '?';
    queryParams += project && `project=${project}&`;
    queryParams += environment && `environment=${environment}`;

    try {
      const response = await fetch(`${API_URL}${queryParams}`, {
        method: 'GET'
      });

      if (response.status !== 200) {
        return fail(401);
      }
      const flags: FlagType[] = await response.json();

      const projectNames = [...new Set(flags.map((f: FlagType) => f.project))];
      const projects: SelectOptionType[] = projectNames.map(pj => ({
        name: pj,
        val: pj
      }));

      return { flags, projects };
    } catch (e) {
      console.error(e);
    }

    redirect(302, '/');
  }
};
