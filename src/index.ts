import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface ConfigOptions {
  database: string;
  token: string;
}

export default class {
  private config: ConfigOptions;
  private axios: AxiosInstance;

  constructor(data: ConfigOptions) {
    this.config = {
      database: data.database,
      token: data.token,
    };

    this.axios = axios.create({
      baseURL: "https://my.mongrel.app/api/v1",
      headers: {
        accept: "application/json",
        "X-API-KEY": this.config.token,
        "X-DATABASE-ID": this.config.database,
      },
    });
  }

  private async execute(closure: Promise<AxiosResponse<any>>) {
    try {
      return await closure;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Get single record
   */
  get(key: string) {
    return this.execute(this.axios.get("/package/" + key));
  }
  /**
   * Upsert record
   */
  put(key: string, data: Record<string, any>) {
    return this.execute(
      this.axios.put("package/" + key, {
        value: data,
      })
    );
  }
  /**
   * Delete record
   */
  delete(key: string, data: Record<string, any>) {
    return this.execute(this.axios.delete("/package/" + key));
  }
}
