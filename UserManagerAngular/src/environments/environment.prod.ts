class Environment {

  getEnviromentsConfig() {
    const env = {
      uri_api : '',
      clientId : '59cd7a41-d9c5-4f94-9bc6-2bb5da87410a',
      production: true,
    };

    const test = window.location.origin;
    if (test.includes('localhost')) {
      env.uri_api = 'https://localhost:44337/api/';
    }

    return env;
  }
}

export const environment = new Environment().getEnviromentsConfig();
