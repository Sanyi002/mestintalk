import _ from 'lodash';

export default class Operator {
  constructor(melyikEmber, melyikPartra, hanyEmbert) {
    this.melyikEmbert = melyikEmber;
    this.melyikPartra = melyikPartra;
    this.hanyEmbert = hanyEmbert;
  }

  /*
    * alkalmazható-e az operátor az adott állapotra?
    *
    * @returns {boolean}
  */
  alkalmazhato(Allapot) {
    let result;

    const hanyEmberVanAhovaMozgatunk = Allapot.allapot.slice(0, Allapot.allapot.length - 1)
      .filter((item) => item[0] === this.melyikPartra);

    if (hanyEmberVanAhovaMozgatunk.length === 0) {
      if (this.hanyEmbert === 1) {
        result = false;
        return result;
      }
    }

    if (this.hanyEmbert === 1) {
      const aktualisEmber = Allapot.allapot[this.melyikEmbert];
      const vanKonfliktus = this.konfliktus(Allapot);

      if (
        aktualisEmber[0] === Allapot.allapot[Allapot.allapot.length - 1]
        && aktualisEmber[0] !== this.melyikPartra
        && !vanKonfliktus
      ) {
        result = true;
      } else {
        result = false;
      }
    } else if (this.hanyEmbert === 2) {
      const aktualisEmber1 = Allapot.allapot[this.melyikEmbert[0]];
      const aktualisEmber2 = Allapot.allapot[this.melyikEmbert[1]];
      const csonakHelyzete = Allapot.allapot[Allapot.allapot.length - 1];
      const vanKonfliktus = this.konfliktusKetEmber(Allapot);


      if (
        (aktualisEmber1[0] === csonakHelyzete && aktualisEmber2[0] === csonakHelyzete)
        && (aktualisEmber1[0] !== this.melyikPartra && aktualisEmber2[0] !== this.melyikPartra)
        && !vanKonfliktus
      ) {
        result = true;
      } else {
        result = false;
      }
    }

    return result;
  }

  /*
    * megnézzük, hogy egy ember mozgatása esetén lesz-e konfliktus
    *
    * @returns {boolean}
  */
  konfliktus(Allapot) {
    const aktEmberNem = Allapot.allapot[this.melyikEmbert][1];
    const aktEmberIndex = Allapot.allapot[this.melyikEmbert][2];
    let result = false;

    const filteredList = Allapot.allapot
      .slice(0, 6)
      .filter((item) => item[0] === this.melyikPartra
        && item[1] !== aktEmberNem
        && item[2] !== aktEmberIndex);

    const parok = [];
    for (let i = 0; i < Allapot.allapot.slice(0, 6).length; i += 1) {
      filteredList.forEach((item) => {
        if (
          Allapot.allapot[i][0] === item[0]
          && Allapot.allapot[i][1] !== item[1]
          && Allapot.allapot[i][2] === item[2]
        ) {
          parok.push(true);
        }
      });
    }

    if (filteredList.length !== parok.length) {
      result = true;
    }

    return result;
  }

  /*
    * megnézzük, hogy két ember mozgatása esetén lesz-e konfliktus
    *
    * @returns {boolean}
  */
  konfliktusKetEmber(Allapot) {
    let result = false;

    const aktEmberNem1 = Allapot.allapot[this.melyikEmbert[0]][1];
    const aktEmberNem2 = Allapot.allapot[this.melyikEmbert[1]][1];

    const aktEmberIndex1 = Allapot.allapot[this.melyikEmbert[0]][2];
    const aktEmberIndex2 = Allapot.allapot[this.melyikEmbert[1]][2];

    if (
      aktEmberNem1 !== aktEmberNem2
      && aktEmberIndex1 !== aktEmberIndex2
    ) {
      const filteredList1 = Allapot.allapot
        .slice(0, 6)
        .filter(((item) => item[0] === this.melyikPartra
          && (item[1] !== aktEmberNem1 && item[2] === aktEmberIndex1)
        ));
      const filteredList2 = Allapot.allapot
        .slice(0, 6)
        .filter((item) => item[0] === this.melyikPartra
          && (item[1] !== aktEmberNem2 && item[2] === aktEmberIndex2));

      if (filteredList1.length !== 1 || filteredList2.length !== 1) {
        result = true;
      }
    } else if (aktEmberNem1 !== aktEmberNem2 && aktEmberIndex1 === aktEmberIndex2) {
      const filteredList = Allapot.allapot
        .slice(0, 6)
        .filter(((item) => item[0] === this.melyikPartra
          && (item[1] === 'n')
        ));


      const parok = [];
      for (let i = 0; i < Allapot.allapot.slice(0, 6).length; i += 1) {
        filteredList.forEach((item) => {
          if (
            Allapot.allapot[i][0] === item[0]
                && Allapot.allapot[i][1] !== item[1]
                && Allapot.allapot[i][2] === item[2]
          ) {
            parok.push(true);
          }
        });
      }

      if (filteredList.length !== parok.length) {
        result = true;
      } else {
        result = false;
      }
    } else {
      const filteredList1 = Allapot.allapot
        .slice(0, 6)
        .filter(((item) => item[0] === this.melyikPartra
          && ((item[1] !== aktEmberNem1 && item[2] !== aktEmberIndex1))
        ));

      const parok1 = [];
      for (let i = 0; i < Allapot.allapot.slice(0, 6).length; i += 1) {
        filteredList1.forEach((item) => {
          if (
            Allapot.allapot[i][0] === item[0]
              && Allapot.allapot[i][1] !== item[1]
              && Allapot.allapot[i][2] === item[2]
          ) {
            parok1.push(true);
          }
        });
      }

      if (filteredList1.length !== parok1.length) {
        result = true;
      }

      const filteredList2 = Allapot.allapot
        .slice(0, 6)
        .filter(((item) => item[0] === this.melyikPartra
          && ((item[1] !== aktEmberNem2 && item[2] !== aktEmberIndex2))
        ));

      const parok2 = [];
      for (let i = 0; i < Allapot.allapot.slice(0, 6).length; i += 1) {
        filteredList2.forEach((item) => {
          if (
            Allapot.allapot[i][0] === item[0]
              && Allapot.allapot[i][1] !== item[1]
              && Allapot.allapot[i][2] === item[2]
          ) {
            parok2.push(true);
          }
        });
      }

      if (filteredList2.length !== parok2.length) {
        result = true;
      }
    }


    return result;
  }

  /*
    * alkalmazzuk az operátort
    *
    * @returns {Allapot}
  */
  alkalmaz(regiAllapot) {
    const uj = _.cloneDeep(regiAllapot); // eslint-disable-line prefer-object-spread

    if (this.hanyEmbert === 1) {
      uj.allapot[this.melyikEmbert[0]][0] = this.melyikPartra;
    } else {
      uj.allapot[this.melyikEmbert[0]][0] = this.melyikPartra;
      uj.allapot[this.melyikEmbert[1]][0] = this.melyikPartra;
    }

    uj.allapot[uj.allapot.length - 1] = this.melyikPartra;

    return uj;
  }
}
