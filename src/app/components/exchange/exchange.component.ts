import {Component, OnInit} from '@angular/core';
import {FetchService} from "../../services/fetch.service";
import {Currency} from "../../../types";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit{

  rates: {[key: string]: number} = {};

  currencies: Currency = {};
  primaryVal: number = 0;
  primaryCur: string = "";

  secondaryVal: number = 0;
  secondaryCur: string = "";
  constructor(private fetchService: FetchService) {}

  ngOnInit() {
    this.fetchService.makeRequest().subscribe((data)=>{
      this.currencies = data;

      for (const i in data) {
        this.rates[i] = 1 / (Number(data[i]) ?? 1);
      }

      this.primaryCur = Object.keys(data)[0];
      this.secondaryCur = Object.keys(data)[0];

    })
  }

  setPrimaryVal(val: Event){
    this.primaryVal = Number((val.target as HTMLInputElement).value);

    const total = this.primaryVal / (1 / Number(this.rates[this.primaryCur]));
    // translate money into second input
    // @ts-ignore
    this.secondaryVal = (total * (1 / Number(this.rates[this.secondaryCur]))).toFixed(2);

  }

  setPrimaryCur(val: Event){
    this.primaryCur = (val.target as HTMLInputElement).value;

    const total = this.primaryVal / (1 / Number(this.rates[this.primaryCur]));
    // translate money into second input
    // @ts-ignore
    this.secondaryVal = (total * (1 / Number(this.rates[this.secondaryCur]))).toFixed(2);

  }

  setSecondaryVal(val: Event){
    this.secondaryVal = Number((val.target as HTMLInputElement).value);

    const total = this.secondaryVal / (1 / Number(this.rates[this.secondaryCur]));
    // translate money into second input
    // @ts-ignore
    this.primaryVal = (total * (1 / Number(this.rates[this.primaryCur]))).toFixed(2);

  }

  setSecondaryCur(val: Event){
    this.secondaryCur = (val.target as HTMLInputElement).value;

    const total = this.secondaryVal / (1 / Number(this.rates[this.secondaryCur]));
    // translate money into second input
    // @ts-ignore
    this.primaryVal = (total * (1 / Number(this.rates[this.primaryCur]))).toFixed(2);
  }

  protected readonly Number = Number;
}
