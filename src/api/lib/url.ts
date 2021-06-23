const url = process.env.NEXT_PUBLIC_SERVER_URL as string;

export class FooEndPoint {
  private _url: URL;

  constructor(path: string) {
    this._url = new URL(url + path);
  }

  addParams = function (this: FooEndPoint, key: string, value: string): FooEndPoint {
    this._url.searchParams.append(key, value);
    return this;
  };

  get url() {
    return this._url.toString();
  }
}
