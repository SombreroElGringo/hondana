import { Injectable } from "@nestjs/common";
import { get } from "../common/http/http";
import * as qs from "querystring";
import { Station } from "./models/station.interface";

@Injectable()
export class StationService {
  private apiURL: string = "https://data.sncf.com/api";
  private endpoint: string =
    "/records/1.0/search/?dataset=liste-des-gares&rows=10000&facet=fret&facet=voyageurs&facet=code_ligne&facet=departement&refine.voyageurs=O";

  findAll(query?: string): Promise<Station[]> {
    const url =
      this.apiURL + this.endpoint + (query ? `&${qs.stringify(query)}` : "");
    let stations: Station[] = [];
    return get(url, null)
      .then(response => {
        const records = response["records"] ? response["records"] : [];
        if (records.length > 0) {
          records.map(item => {
            const station: Station = {
              recordId: item.recordid,
              libelle_gare: item.fields.libelle_gare,
              departement: item.fields.departement,
              commune: item.fields.commune,
              code_ligne: item.fields.code_ligne,
              coordonnees_geographiques: item.fields.coordonnees_geographiques,
            }; 
            stations.push(station);
          });
        }
        return stations;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
