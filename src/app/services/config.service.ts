import { Injectable } from '@angular/core';
import {Observable, shareReplay} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Config} from "../../types";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // @ts-ignore
  currenciesList$: Observable<Config>;

  constructor(private http: HttpClient) {}

  getConfig(): Observable<Config>{
    if (!this.currenciesList$){
      this.currenciesList$ = this.http.get<Config>('assets/config.json').pipe(
        shareReplay(1)
      );
    }
    return this.currenciesList$;
  }

  generateURL(config: Config): string {
    // Generate the URL using the currencies array
    const url = `https://api.currencyapi.com/v3/latest?apikey=${config.apiKey}&currencies=`;
    const queryParams = config.currencies.map((currency) => `${currency}`).join('%2C');
    return url + queryParams + "&base_currency=" + config.baseCurrency;
  }

}
