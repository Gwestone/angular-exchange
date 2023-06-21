import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  currenciesList: Observable<string[]>;

  constructor(private http: HttpClient) {
    this.currenciesList = http.get<string[]>('assets/currencies.json');
  }

  getCurrenciesList(): Observable<string[]>{
    return this.currenciesList;
  }

  generateURL(currencies: string[]): string {
    // Generate the URL using the currencies array
    const url = 'https://api.currencyapi.com/v3/latest?apikey=nolkmojr4LTqNd6X0a4EFuvFPeyaAna3fqMLAZdf&currencies=';
    const queryParams = currencies.map((currency) => `${currency}`).join('%2C');
    return url + queryParams + "&base_currency=UAH";
  }

}
