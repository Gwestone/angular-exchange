import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Data} from "../../types";
import {map, Observable, switchMap} from "rxjs";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient, private config: ConfigService) {
    // fetch(
    //   this.serviceURL,
    //   {}
    // )
    //   .then((response) => response.json())
    //   .then((rawResponseData) => {
    //     return Object.keys(rawResponseData.data).reduce<Data>((acc, key) => {
    //       acc[key] = rawResponseData.data[key].value;
    //       return acc;
    //     }, {});
    //   })
    //   .then((parsedData) => {
    //     this.currencies = parsedData;
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

  public makeRequest(): Observable<Data>{

    return this.config.getConfigCurrencies().pipe(

      switchMap((currencies)=>{
        return this.http.get<any>(this.config.generateURL(currencies)).pipe(

          map((rawResponseData) => {
            return Object.keys(rawResponseData.data).reduce<Data>((acc, key) => {
              acc[key] = rawResponseData.data[key].value;
              return acc;
            }, {});
          })

        );

      })
    )
  }
}
