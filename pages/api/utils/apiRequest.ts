import { IRequest, RequestMethod } from "./schema"

/**
 * The function `apiRequest` is a TypeScript function that makes an API request using the Fetch API.
 * @param {IRequest}  - - `url`: The URL of the API endpoint to make the request to.
 */
export const apiRequest = ({ url, options }: IRequest) =>
  fetch(url, {
    method: options?.method || RequestMethod.GET,
    body: options?.body,
    headers: {
      'content-type': 'application/json',
      ...options?.headers,
    },
  }).then((response) => response.json())
