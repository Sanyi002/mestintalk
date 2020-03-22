export default class Csucs {
  constructor(Allapot, Szulo, Operator, Problema) {
    this.allapot = Allapot;
    this.szulo = Szulo;
    this.eloallito = Operator;
    this.nemProbalt = [];

    Problema.operatorok.forEach((op) => {
      if (op.alkalmazhato(this.allapot)) {
        this.nemProbalt.push(op);
      }
    });
  }
}
