class RAF {
  private callbacks: { name: string; callback: () => void }[];
  private lastTimestamp: number;
  public dt: number;

  constructor() {
    this.bind();
    this.callbacks = [];
    this.lastTimestamp = 0;
    this.dt = 0;
    this.render(0);
  }

  subscribe(name: string, callback: () => void) {
    this.callbacks.push({
      name: name,
      callback: callback,
    });
  }

  unsubscribe(name: string) {
    this.callbacks = this.callbacks.filter(item => item.name !== name);
  }

  render(timestamp: number) {
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }
    this.dt = timestamp - this.lastTimestamp; // Convert to seconds
    this.lastTimestamp = timestamp;

    requestAnimationFrame(this.render.bind(this));
    this.callbacks.forEach((item) => {
      item.callback();
    });
  }

  private bind() {
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.render = this.render.bind(this);
  }
}

const _instance = new RAF();
export default _instance;
