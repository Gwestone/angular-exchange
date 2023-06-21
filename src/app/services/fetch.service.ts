import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Data} from "../../types";
import {map, Observable, shareReplay, switchMap} from "rxjs";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  // @ts-ignore
  private requestCache$: Observable<Data>;

  constructor(private http: HttpClient, private config: ConfigService) {}

  public makeRequest(): Observable<Data>{

    return this.config.getConfigCurrencies().pipe(

      switchMap((currencies)=>{
        if (!this.requestCache$){
          this.requestCache$ = this.http.get<any>(this.config.generateURL(currencies)).pipe(

            map((rawResponseData) => {
              return Object.keys(rawResponseData.data).reduce<Data>((acc, key) => {
                acc[key] = rawResponseData.data[key].value;
                return acc;
              }, {});
            }),
            shareReplay(1)

          );
        }

        return this.requestCache$;

      })
    )
  }
}
