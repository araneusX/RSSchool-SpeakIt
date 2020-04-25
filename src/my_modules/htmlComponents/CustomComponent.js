import { clearInnerHTML, turnAttributes } from './utils';
import ProtoComponent from './ProtoComponent';

class CustomComponent extends ProtoComponent {
  constructor(props = {}) {
    super();
    this.props = props;
    this.component = this.render();
    this.node = this.component.node;
    this.children = this.component.children;
  }

  refresh(newProps) {
    this.props = newProps;
    this.refreshChildren(newProps);
  }

  rerender() {
    const component = this.render();
    const newChildren = [...component.children];
    const newAttributes = { ...component.attributes };

    clearInnerHTML(this.node);

    newChildren.forEach((item) => {
      this.node.append(item.node);
    });
    this.children = newChildren;

    turnAttributes(this.node, newAttributes);
    this.attributes = newAttributes;
  }

  render() {}
}

export default CustomComponent;
