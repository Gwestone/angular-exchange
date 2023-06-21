import {Component, Input, OnInit} from '@angular/core';
import {FetchService} from "../../services/fetch.service";
import {Data} from "../../../types";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit{

  rates: { EUR: number, USD: number, PLN: number, CZK: number, UAH: number } = {EUR: 1, USD: 1, PLN: 1, CZK: 1, UAH: 1};

  currencies: Data = {};
  @Input() primaryVal: number = 0;
  @Input() primaryCur: string = "";

  @Input() secondaryVal: number = 0;
  @Input() secondaryCur: string = "";
  constructor(private fetchService: FetchService) {}

  ngOnInit() {
    this.fetchService.makeRequest().subscribe((data)=>{
      this.currencies = data;

      let EUR = 1 / (Number(data['EUR']) ?? 1);
      let USD = 1 / (Number(data['USD']) ?? 1);
      let PLN = 1 / (Number(data['PLN']) ?? 1);
      let CZK = 1 / (Number(data['CZK']) ?? 1);
      let UAH = 1;

      this.rates = { EUR: EUR, USD: USD, PLN: PLN, CZK: CZK, UAH: UAH };

    })
  }

  setPrimaryVal(val: Event){
    this.primaryVal = Number((val.target as HTMLInputElement).value);

    // get total amount of entered money in UAH
    // @ts-ignore
    const total = this.primaryVal / (1 / Number(this.rates[this.primaryCur]));
    // translate money into second input
    // @ts-ignore
    this.secondaryVal = (total * (1 / Number(this.rates[this.secondaryCur]))).toFixed(2);

  }

  setPrimaryCur(val: Event){
    this.primaryCur = (val.target as HTMLInputElement).value;

    // get total amount of entered money in UAH
    // @ts-ignore
    const total = this.primaryVal / (1 / Number(this.rates[this.primaryCur]));
    // translate money into second input
    // @ts-ignore
    this.secondaryVal = (total * (1 / Number(this.rates[this.secondaryCur]))).toFixed(2);

  }

  setSecondaryVal(val: Event){
    this.secondaryVal = Number((val.target as HTMLInputElement).value);

    // get total amount of entered money in UAH
    // @ts-ignore
    const total = this.secondaryVal / (1 / Number(this.rates[this.secondaryCur]));
    // translate money into second input
    // @ts-ignore
    this.primaryVal = (total * (1 / Number(this.rates[this.primaryCur]))).toFixed(2);

  }

  setSecondaryCur(val: Event){
    this.secondaryCur = (val.target as HTMLInputElement).value;

    // get total amount of entered money in UAH
    // @ts-ignore
    const total = this.secondaryVal / (1 / Number(this.rates[this.secondaryCur]));
    // translate money into second input
    // @ts-ignore
    this.primaryVal = (total * (1 / Number(this.rates[this.primaryCur]))).toFixed(2);
  }

  protected readonly Number = Number;
}
