import Csucs from './Csucs';

export default class Korfigyeles {
  megoldas(Csucs) { // eslint-disable-line class-methods-use-this
    const megoldas = [];
    for (let cs = Csucs; cs !== null; cs = cs.szulo) {
      megoldas.unshift(cs.eloallito);
    }
    return megoldas;
  }

  osszehasonlitas(allapot1, allapot2) { // eslint-disable-line class-methods-use-this
    let result;
    const BreakException = {};
    for (let i = 0; i < allapot1.length - 1; i += 1) {
      try {
        allapot1[i].forEach((item, j) => { // eslint-disable-line no-loop-func
          result = allapot2[i][j] === item;
          if (!result) throw BreakException;
        });
      } catch (e) {
        result = false;
        return result;
      }
    }
    if (result) {
      result = allapot1[allapot1.length - 1] === allapot2[allapot2.length - 1];
    }
    return result;
  }

  keres(Problema) { // eslint-disable-line consistent-return
    let aktualis = new Csucs(Problema.kezdo(), null, null, Problema);

    if (aktualis.allapot.isCelAllapot()) {
      return this.megoldas(aktualis);
    }

    while (true) {
      if (aktualis === null) {
        return null;
      }

      if (aktualis.allapot.isCelAllapot()) {
        break;
      }

      for (let cs = aktualis.szulo; cs !== null; cs = cs.szulo) {
        if (this.osszehasonlitas(cs.allapot.allapot, aktualis.allapot.allapot)) {
          aktualis = aktualis.szulo;
          break;
        }
      }

      if (aktualis.nemProbalt.length !== 0) {
        const o = aktualis.nemProbalt.shift();
        const uj = o.alkalmaz(aktualis.allapot);


        aktualis = new Csucs(uj, aktualis, o, Problema);
      } else {
        aktualis = aktualis.szulo;
      }
    }
    if (aktualis !== null) {
      return this.megoldas(aktualis);
    }
  }
}
