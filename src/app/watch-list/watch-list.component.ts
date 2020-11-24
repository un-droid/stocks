import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Instrument } from 'src/models/Instrument';
import { SortingAction } from 'src/models/SortingAction';
import { InstrumentsService } from 'src/services/instruments.service';
import { UpdateService } from 'src/services/update.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit, OnDestroy {

  instrumentsList: Instrument[] = [];
  private intervalSubscriptor: Subscription;

  constructor(private instrumentServ:InstrumentsService,  private updateService:UpdateService, ) {
    this.instrumentServ.instrumentsSubject.subscribe(updatedInstruments => {
      this.instrumentServ.instrumentsList = updatedInstruments;
      this.instrumentsList = updatedInstruments;
    });
   }

  ngOnDestroy(): void {
    this.instrumentServ.instrumentsSubject.unsubscribe();
    this.intervalSubscriptor.unsubscribe();

  }

  ngOnInit(): void {
    
    this.intervalSubscriptor = interval(3000).subscribe(()=>{
      this.updateService.updateStockPrices(this.instrumentsList);
    });
  }

  sortViewBy(sortAction:SortingAction): void{
    switch(sortAction) {
      case 0: //by market name
        this.instrumentsList = this.instrumentServ.sortByField(this.instrumentsList, "name");
        break;
      case 1: //by buy price
        this.instrumentsList = this.instrumentServ.sortByField(this.instrumentsList, "currentPrice");
        break;
      case 2: //by sell price
        this.instrumentsList = this.instrumentServ.sortByField(this.instrumentsList, "currentPrice");
        break;
      default:
        this.instrumentsList = this.instrumentServ.getRandomInstrumentsByAmount();
          
    }
  }

  trackFunc(index):number{
    return index;
  }

}
