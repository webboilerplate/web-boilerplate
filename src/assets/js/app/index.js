export default class App {

  static NAME = 'Web Boilerplate';

  constructor() {
    this._initialized = false;
  }

  initialize() {
    this._initialized = true;
  }

  start() {
    if (!this._initialized) {
      this.initialize();

      console.log(`
          Moin Moin
        and welcome to
        ${App.NAME}`);
    }
  }

  pause() {}

  stop() {}

}
