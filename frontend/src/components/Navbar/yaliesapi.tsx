import fetch from 'node-fetch';

const HOST = 'https://yalies.io';
const API_ROOT = '/api/';

class API {
  constructor(key: any) {
    this.key = key;
  }

  post(endpoint: string, body: any) {
    const url = new URL(HOST + API_ROOT + endpoint);
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.key,
      },
      body: JSON.stringify(body),
    }).then((response: { json: () => any; }) => response.json());
  }

  people(criteria: any) {
    return this.post('people', criteria);
  }
}

exports.API = API;
