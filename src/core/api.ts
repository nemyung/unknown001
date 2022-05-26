import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { getToken } from "./helpers";

import { ResponseData, Filter } from "./types";

class _ClubAPI {
  public instance: AxiosInstance;

  public constructor() {
    this.instance = this.init();
  }

  public init() {
    const baseURL = process.env.REACT_APP_BASE_URL as string;
    const instance = axios.create({ baseURL });

    instance.interceptors.request.use(this.setToken);
    return instance;
  }

  public setToken(config: AxiosRequestConfig) {
    if (config.headers === undefined) {
      config.headers = {};
    }
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  }

  public async listByFilter(filter: Filter) {
    const { data } = await this.instance.get<ResponseData>("/ePNAVU1sgGtQ/data");
    return data;
  }

  public async detail(id: string) {
    const { data } = await this.instance.get<ResponseData>("/ePNAVU1sgGtQ/data");
    return data;
  }
}

const ClubAPI = new _ClubAPI();
export default ClubAPI;
