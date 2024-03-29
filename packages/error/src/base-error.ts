import { ErrorType } from './constants';

export class BaseError<Data = unknown, Options = unknown> extends Error {
  public data?: Data;
  public options?: Options;

  constructor(name: string, message: string, data?: Data, options?: Options) {
    super(message);

    this.name = name || ErrorType.BaseError;
    this.data = data;
    this.options = options;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      data: this.data,
      options: this.options,
    };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  getData() {
    return this.data;
  }

  getOptions() {
    return this.options;
  }
}
