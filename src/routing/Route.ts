export default class Route {
  public path;
  public name;
  public alias;
  public props;

  public meta: {
    layout?: string;
    middleware?: Array<any>;
  } = {};

  public components;

  public group;

  protected component;

  constructor(
    path: string,
    components: string | object | Array<string>,
    props = {}
  ) {
    this.path = path;
    this.props = props;

    this.registerComponents(components);
  }

  public setName(name: string): this {
    this.name = name;
    return this;
  }

  public setMeta(data): this {
    this.meta = Object.assign(this.meta, data);
    return this;
  }

  public setAlias(alias) {
    this.alias = alias;
    return this;
  }

  public setLayout(layout) {
    this.meta.layout = layout;
    return this;
  }

  private registerComponents(components) {
    if (typeof components === "object") {
      this.components = {};
      for (let name in components) {
        this.components[name] = this.getComponent(components[name]);
      }
    } else {
      this.component = this.getComponent(components);
    }
  }

  private getComponent(component) {
    return typeof component === "function"
      ? component
      : require(`@views/${component}`).default;
  }
}
