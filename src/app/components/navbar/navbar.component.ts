import {Component, OnInit} from '@angular/core';
import {FetchService} from "../../services/fetch.service";
import {Currency} from "../../../types";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  currencies: Currency = {};

  constructor(private fetchService: FetchService) {}

  ngOnInit() {
    this.fetchService.makeRequest().subscribe((data)=>{
      this.currencies = data;
    });
  }

  protected readonly Number = Number;
}
