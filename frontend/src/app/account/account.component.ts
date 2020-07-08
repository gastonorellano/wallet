import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/restapi.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  constructor(public restApi: RestApiService) {}

  old = true;
  ether: string = '0';
  account: string;
  dolar: number;
  euro: number;
  Fiat: string;

  accountshow: string;
  monedaShow: string;
  Valor: string;
  editmode = false;

  fiat = [
    { value: 'USD', viewValue: 'Dolar Americanos' },
    { value: 'euro', viewValue: 'Euro' },
  ];

  ngOnInit(): void {
    this.GetQuotation();
  }

  changeEditMode() {
    this.editmode = !this.editmode;
  }

  onFIATChange() {
    switch (this.Fiat.toLowerCase()) {
      case 'euro':
        this.Valor = (
          (Number.isNaN(this.ether) ? 0 : Number.parseFloat(this.ether)) *
          this.euro
        ).toFixed(2);
        break;
      case 'usd':
        this.Valor = (
          (Number.isNaN(this.ether) ? 0 : Number.parseFloat(this.ether)) *
          this.dolar
        ).toFixed(2);
        break;
    }
  }

  runAll() {
    this.GetAccount();
    this.GetBalance();
  }

  GetAccount() {
    this.restApi.getAccount(this.account).subscribe((data) => {
      this.old = data.old;
      this.accountshow = this.account;
    });
  }

  GetBalance() {
    this.restApi.getBalance(this.account).subscribe((data) => {
      this.ether = data.eth;
    });
  }
  GetQuotation() {
    this.restApi.getCotizacion().subscribe((data) => {
      this.dolar = data.usd;
      this.euro = data.euro;
    });
  }
}
