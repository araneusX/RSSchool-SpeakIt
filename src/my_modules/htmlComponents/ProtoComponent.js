export default class ProtoComponent {
  refresh(newProps) {
    this.refreshChildren(newProps);
  }

  refreshChildren(newProps) {
    this.children.forEach((child) => {
      if (Object.prototype.hasOwnProperty.call(child, 'props')) {
        const newChildProps = {};
        let isFresh = true;

        Object.keys(child.props).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(child.props, key)) {
            if (Object.prototype.hasOwnProperty.call(newProps, key)
                && child.props[key] !== newProps[key]) {
              newChildProps[key] = newProps[key];
              isFresh = false;
            } else {
              newChildProps[key] = child.props[key];
            }
          }
        });

        if (!isFresh) {
          child.refresh(newChildProps);
        }
      } else {
        child.refresh(newProps);
      }
    });
  }
}