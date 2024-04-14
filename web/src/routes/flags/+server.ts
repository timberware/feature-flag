import { json } from '@sveltejs/kit';
import { API_HOST } from '$env/static/private';

const API = `${process.env.API_HOST || API_HOST || 'http://localhost:3000'}/flags`;

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
  const name = url.searchParams.get('name');
  const project = url.searchParams.get('project');
  const environment = url.searchParams.get('environment');

  const query = { name, project, environment };
  let includeQP = false;
  let queryParams = '';

  for (const param in query) {
    if (query[param] && query[param] !== 'undefined') {
      queryParams += `${param}=${query[param]}&`;
      includeQP = true;
    }
  }

  let api = API;
  if (includeQP) {
    api += `?${queryParams}`;
  }

  const response = await fetch(api, {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  });

  let results = [];
  if (response.status === 200) {
    results = await response.json();
  }

  return json(results);
};
