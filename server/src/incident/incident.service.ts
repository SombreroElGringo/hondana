import { Injectable } from "@nestjs/common";
import { get } from "../common/http/http";
import * as qs from "querystring";
import { Incident } from "./models/incident.interface";

@Injectable()
export class IncidentService {
  private apiURL: string = "https://data.sncf.com/api";
  private endpoint: string =
    "/records/1.0/search/?dataset=incidents-securite&facet=date&facet=type";

  findAll(query?: string) {
    const url =
      this.apiURL + this.endpoint + (query ? `&${qs.stringify(query)}` : "");
    return get(url, null)
      .then(response => response)
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
