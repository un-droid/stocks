import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstrumentsService } from 'src/services/instruments.service';
import { Instrument } from "../models/Instrument";
import { Action } from "../models/Action";
import { UpdateService } from 'src/services/update.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  listOfInstruments:Instrument[];
  loader = false;
  constructor(private instrumentServ:InstrumentsService){}

  ngOnInit() {
    this.instrumentServ.getInstruments();
  }

  ngOnDestroy() {
    
  }
}
