import { DoCheck, NgZone, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Action } from 'src/models/Action';
import { Instrument } from 'src/models/Instrument';
import { InstrumentsService } from 'src/services/instruments.service';
import { interval, Subscription } from "rxjs";

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss']
})
export class InstrumentComponent implements OnInit, OnDestroy {

  constructor(private instrumentServ:InstrumentsService) { }
  ngOnDestroy(): void {
    this.intervalSubscriptor.unsubscribe();
  }
  private intervalSubscriptor: Subscription;
  color = "";

  @Input("instrument")
  instrument: Instrument;
  
  ngOnInit(): void {

  }

  ngDoCheck():void {
    const posClass = "positive-change";
      const negClass = "negative-change";
      const that = this;
      if(this.instrument.currentPrice - this.instrument.openPrice > 0){
        this.color = posClass;
      }else{
        this.color = negClass;
      }
  }

  getChange(instrument:Instrument):number{
    ((instrument.currentPrice - instrument.openPrice) / instrument.openPrice) * 100
    let change = instrument.currentPrice - instrument.openPrice;
    let tmp = (change / instrument.openPrice) * 100;
    return parseFloat(tmp.toFixed(2));
  }

  getNumber(price){
    return price.toFixed(2).toString().split(".")[0]
  }
  getDecimal(price){
    return price.toFixed(2).toString().split(".")[1]
  }

  performBuySellAction(action:Action, instrument:Instrument){
    //the spec sheet says the mothod should accept stock name, action and price, why not pass the instrument itself which has all the needed fields?
    this.instrumentServ.saveTransactionRequestInMemory(action, instrument);
  }

}
