export default class App {

  constructor() {
    this.name = 'Web Boilerplate';
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
        ${this.name}`);
    }
  }

  pause() {}

  stop() {}

}
