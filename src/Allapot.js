
export default class Allapot {
  constructor() {
    this.allapot = [
      ['P', 'f', 1],
      ['P', 'f', 2],
      ['P', 'f', 3],
      ['P', 'n', 1],
      ['P', 'n', 2],
      ['P', 'n', 3],
      'P',
    ];
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
    return result;
  }

  isCelAllapot() {
    const celallapot = [
      ['Q', 'f', 1],
      ['Q', 'f', 2],
      ['Q', 'f', 3],
      ['Q', 'n', 1],
      ['Q', 'n', 2],
      ['Q', 'n', 3],
    ];

    return this.osszehasonlitas(this.allapot, celallapot);
  }
}
