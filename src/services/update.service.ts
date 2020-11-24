import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { InstrumentsService } from './instruments.service';
import { Instrument } from '../models/Instrument';

@Injectable({
  providedIn: 'root',
})
export class UpdateService implements OnDestroy, OnInit {
  instruments: Instrument[] = [];
  constructor(private instrumentServ: InstrumentsService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  private getUpdatedStockPrice(instrument: Instrument) {
    //update price with random value between 1 and -1
    instrument.currentPrice += parseFloat(
      (Math.random() * (Math.round(Math.random()) ? 1 : -1)).toFixed(2)
    );
  }

  updateStockPrices(instruments: Instrument[]): Instrument[] {
    if (!instruments) {
      console.log('no stocks to update');
      return;
    }
    console.log('updated stocks:');
    console.log(instruments);

    instruments.forEach((instrument) => {
      this.getUpdatedStockPrice(instrument);
    });
    //pass the updated instruments to the subject
    this.instrumentServ.instrumentsSubject.next(instruments);
  }
}
