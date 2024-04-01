import { API_HOST } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch }) => {
  let status = 404;

  try {
    const response = await fetch(
      `${process.env.API_HOST || API_HOST || 'http://localhost:3000/flags'}`,
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
