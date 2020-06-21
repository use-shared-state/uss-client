class API {
  constructor(fetch, apiUri) {
    this.fetch = fetch;
    this.apiUri = apiUri;
  }

  async signIn(client, key) {
    this.client = client;
    this.token = await this.clients.signIn({
      solve: key.decrypt(await this.clients.challenge({ client })),
      ttl: 1000,
    });
  }

  clients = {
    challenge: this.createMethod("POST", "/clients/challenge"),
    signIn: this.createMethod("POST", "/clients/sign-in"),
  };

  invite = {
    use: this.createMethod("POST", "/invite/use"),
  };

  reducers = {
    create: this.createMethod("POST", "/reducers/create"),
    list: this.createMethod("POST", "/reducers/list"),
    update: this.createMethod("POST", "/reducers/update"),
  };

  states = {
    archive: this.createMethod("POST", "/states/archive"),
    create: this.createMethod("POST", "/states/create"),
    get: this.createMethod("POST", "/states/get"),
    list: this.createMethod("POST", "/states/list"),
  };

  users = {
    create: this.createMethod("POST", "/users/create"),
    list: this.createMethod("POST", "/users/list"),
    token: this.createMethod("POST", "/users/token"),
    update: this.createMethod("POST", "/users/update"),
  };

  createMethod(url) {
    return async (body) => {
      const response = await this.fetch(`${this.prefix}${url}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          token: this.token,
          "content-type": "application/json",
        },
      });

      let responseBody = await response.text();
      try {
        responseBody = JSON.parse(responseBody);
      } catch (e) {}

      if (response.status === 200) {
        return responseBody;
      }

      const message =
        typeof responseBody === "string"
          ? responseBody
          : JSON.stringify(responseBody);
      if (this.unmute) {
        console.error(`${response.status}:${message}`);
      }
      throw `${response.status}:${message}`;
    };
  }
}

export default API;
