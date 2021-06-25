const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

export class FooEndPoint {
  private _url: URL;

  constructor(path: string, params?: { [name: string]: string }) {
    this._url = new URL(url + path);
    if (params) {
      for (let key in params) {
        this._url.searchParams.append(key, params[key]);
      }
    }
  }

  get url() {
    return this._url.toString();
  }
}
