export class Instrument {
  name: string;
  imgUrl: string;
  openPrice: number;
  currentPrice: number;
  id: number;
  constructor(name, img, oPrice, cPrice, id) {
    this.name = name;
    this.imgUrl = img;
    this.openPrice = oPrice;
    this.currentPrice = cPrice;
    this.id = id;
  }
}
