import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Currency} from "../../types";
import {map, Observable, shareReplay, switchMap} from "rxjs";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  private requestCache$: Observable<Currency> | undefined;

  constructor(private http: HttpClient, private config: ConfigService) {}

  public makeRequest(): Observable<Currency>{

    return this.config.getConfig().pipe(

      switchMap((config)=>{
        if (!this.requestCache$){
          this.requestCache$ = this.http.get<any>(this.config.generateURL(config)).pipe(

            map((rawResponseData) => {
              return Object.keys(rawResponseData.data).reduce<Currency>((parsedResp, key) => {
                parsedResp[key] = rawResponseData.data[key].value;
                return parsedResp;
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
