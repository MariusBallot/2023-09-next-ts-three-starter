class RAF {
  private callbacks: { name: string; callback: () => void }[];
  private requestId: number | undefined;
  private prevTimestamp: number | undefined;
  public dt: number = 0;

  constructor() {
    this.bind();
    this.callbacks = [];
    this.render = this.render.bind(this);
    this.render();
  }

  subscribe(name: string, callback: () => void) {
    this.callbacks.push({
      name: name,
      callback: callback,
    });
  }

  unsubscribe(name: string) {
    this.callbacks = this.callbacks.filter((item) => item.name !== name);
  }

  render(timestamp: number = 0) {
    if (typeof window !== 'undefined') {
      if (this.prevTimestamp === undefined) {
        this.prevTimestamp = timestamp;
      }

      // Calculate the frame delta time
      this.dt = (timestamp - this.prevTimestamp); // Convert to seconds
      this.prevTimestamp = timestamp;

      this.requestId = window.requestAnimationFrame(this.render);
    }

    this.callbacks.forEach((item) => {
      item.callback();
    });
  }

  private bind() {
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.render = this.render.bind(this);
  }

  stop() {
    if (typeof window !== 'undefined' && this.requestId !== undefined) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = undefined;
    }
  }
}

const _instance = new RAF();
export default _instance;