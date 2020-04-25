import ProtoComponent from './ProtoComponent';

export default class Component extends ProtoComponent {
  constructor(HTMLElement, childrenComponents = null, attributes = {}) {
    super();
    this.node = HTMLElement;
    this.children = childrenComponents;
    this.attributes = attributes;
  }
}
