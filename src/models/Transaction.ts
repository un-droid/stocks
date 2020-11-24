import { Action } from "./Action";

export class Transaction{
    stockName: string;
    action: Action;
    price: number;
    constructor(name, action, price){
        this.stockName = name;
        this.action = action;
        this.price = price;
    }

    getDescription(){
        console.log(`stock name: ${this.stockName}, action: ${this.action == 0 ? "Buy" : "Sell"}, price: ${this.price}`);
        
    }
}