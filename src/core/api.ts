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
    return this.filter(data, filter);
  }

  public filter(data: ResponseData, filter: Filter) {
    const filterEntries = Object.entries(filter).filter(([_, value]) => Boolean(value));
    let mutationResult = data;

    if (filterEntries.length === 0) {
      return mutationResult;
    }

    for (const [key, value] of filterEntries) {
      if (key === "searchFilter") {
        const tinyRegex = /[^a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g;
        mutationResult = mutationResult.filter(({ club }) => {
          const { name } = club;
          const filteredApiClubName = name.replace(tinyRegex, "");
          const [searchClubName] = value;
          const filteredSearchClubName = searchClubName.replace(tinyRegex, "");
          return (
            filteredSearchClubName.length > 0 &&
            filteredApiClubName.includes(filteredSearchClubName)
          );
        });
        continue;
      }

      if (key === "type") {
        mutationResult = mutationResult.filter(({ club }) => {
          return value.some((char) => char === club["type"]);
        });
        continue;
      }

      mutationResult = mutationResult.filter(({ club }) => {
        return value.some((char) => char === club["place"]);
      });
    }
    return mutationResult;
  }

  public async detail(id: string) {
    const { data } = await this.instance.get<ResponseData>("/ePNAVU1sgGtQ/data");
    return data;
  }
}

const ClubAPI = new _ClubAPI();
export default ClubAPI;
