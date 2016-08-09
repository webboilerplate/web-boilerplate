import App from './app';

export default class Main {

  constructor() {
    this.app = new App();
    this.app.start();
  }
}

new Main();
