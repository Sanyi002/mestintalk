import Operator from './Operator';
import Allapot from './Allapot';

export default class Problema {
  constructor() {
    this.operatorok = [];
    this.emberek = [0, 1, 2, 3, 4, 5];
    this.partok = ['P', 'Q'];

    /*
      * létrehozzuk az összes egy embert mozgató operátort
    */
    this.partok.forEach((part) => {
      this.emberek.forEach((ember) => {
        this.operatorok.push(new Operator([ember], part, 1));
      });
    });

    /*
      * létrehozzuk az összes két embert mozgató operátort
    */
    this.partok.forEach((part) => {
      this.operatorok.push(new Operator([0, 1], part, 2));
      this.operatorok.push(new Operator([0, 2], part, 2));
      this.operatorok.push(new Operator([0, 3], part, 2));
      this.operatorok.push(new Operator([0, 4], part, 2));
      this.operatorok.push(new Operator([0, 5], part, 2));
      this.operatorok.push(new Operator([1, 2], part, 2));
      this.operatorok.push(new Operator([1, 3], part, 2));
      this.operatorok.push(new Operator([1, 4], part, 2));
      this.operatorok.push(new Operator([1, 5], part, 2));
      this.operatorok.push(new Operator([2, 3], part, 2));
      this.operatorok.push(new Operator([2, 4], part, 2));
      this.operatorok.push(new Operator([2, 5], part, 2));
      this.operatorok.push(new Operator([3, 4], part, 2));
      this.operatorok.push(new Operator([3, 5], part, 2));
      this.operatorok.push(new Operator([4, 5], part, 2));
    });
  }

  kezdo() { // eslint-disable-line class-methods-use-this
    return new Allapot();
  }

  operatorok() {
    return this.operatorok;
  }
}
