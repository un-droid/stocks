import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instrument } from "../models/Instrument";
import { map } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';
import { Action } from '../models/Action';
import { Transaction } from '../models/Transaction';
import { UpdateService } from './update.service';

const apiKey = "yn9ZP7POxqmf68gzUcj3Q";
const apiUrl = `https://fcsapi.com/api-v3/stock/indices?country=finland&access_key=${apiKey}`;
const existingInstrumentProperties:string[] = ["name","imgUrl","openPrice", "currentPrice"];

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService{

  instrumentsList: Instrument[] = [];
  transaction: Transaction;
  instrumentsSubject: Subject<Instrument[]> = new Subject<Instrument[]>();

  constructor(private http: HttpClient) { }
  private getRandomOpenPrice():number{
    return ~~(Math.random() * 130) + 50; //just a random price between 50 and 130
  }
  private getRandomCurrentPrice(openPrice: number):number{
    return openPrice + (Math.random() * (Math.round(Math.random()) ? 1 : -1)); //random current price
  }

  getInstruments(){
    this.http.get(apiUrl).pipe(map(response =>{
      const arrOfInstruments:Instrument[] = [];
      for (let i = 0; i < 30; i++) {
        //create new instrument
        const name = response["response"][i].full_name;
        const imgUrl = "https://e7.pngegg.com/pngimages/724/759/png-clipart-apple-logo-apple-computer-icons-apple-logo-heart-computer.png";
        const openPrice = this.getRandomOpenPrice();
        const currentPrice = this.getRandomCurrentPrice(openPrice);
        arrOfInstruments.push(new Instrument(name, imgUrl, openPrice, currentPrice, i));
      }

      return arrOfInstruments

    })).subscribe(res =>{
      this.instrumentsList = res;
      this.instrumentsSubject.next(res);

    });
  }

  sortByField(array:Instrument[], key:string) {
    return array.sort((a, b) => {
        const x = a[key]; 
        const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  /*
    B.I
  */
  getInstrumentsByFieldAndAmount(amount:number, field:string):Instrument[]{
    if(!amount && !field || !existingInstrumentProperties.includes(field) || amount > this.instrumentsList.length || amount <= 0){
      console.log("missing parameters or field does not exist in Instrument");
      return null;
    }
    return this.sortByField(this.instrumentsList, field).slice(0, amount);
  }

  /*
    B.II
  */
  getRandomInstrumentsByAmount(amount:number = this.instrumentsList.length):Instrument[]{
    if(amount > this.instrumentsList.length || amount <= 0){
      console.log("invalid parameters, must provide valid amount");
      return null;
    }
    //shuffle list
    const shuffledInstruments = this.instrumentsList.sort(() => 0.5 - Math.random());
    //slice it by given amount
    return shuffledInstruments.slice(0, amount);
  }

  /*
    B.III
  */
  saveTransactionRequestInMemory(action:Action, instrument:Instrument):void{
    if(!instrument){
      console.log("invalid instrument");
      return null;
    }

    if(action > 1){
      console.log("action not supported");
      return null;
    }

    //this is the part where the transaction is saved to memory
    this.transaction = new Transaction(instrument.name, action, instrument.openPrice);
    console.log(this.transaction.getDescription());
    
    //what does store in memory mean? if memory of service then above is good, if memory means session storage then bellow is good
    //sessionStorage.setItem("requestedTransaction", JSON.stringify(this.transaction));
  }

}
