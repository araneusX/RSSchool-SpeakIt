export const clearInnerHTML = (HTMLelement) => {
  while (HTMLelement.firstChild) {
    HTMLelement.removeChild(HTMLelement.firstChild);
  }
};

export const turnAttributes = (element, attributes) => {
  const el = element;
  Object.keys(attributes).forEach((attribute) => {
    switch (attribute) {
      case 'className':
        el.className = attributes.className.trim();
        break;
      case 'id':
        el.id = attributes.id;
        break;
      case 'src':
        el.src = attributes.src;
        break;
      case 'href':
        el.href = attributes.href;
        break;
      case 'style':
        el.style = attributes.style;
        break;
      case 'value':
        el.value = attributes.value;
        break;
      case 'size':
        el.size = attributes.size;
        break;
      default:
        el.setAttribute(attribute, attributes[attribute]);
    }
  });
};

export const turnContent = (element, content) => {
  const childComponents = [];
  content.forEach((item) => {
    if (item.node && item.node instanceof HTMLElement) {
      element.append(item.node);
      item.parentNode = element;
      childComponents.push(item);
    } else {
      const textNode = item.node
        ? document.createTextNode(item.node)
        : document.createTextNode(item);
      element.append(textNode);
    }
  });
  return childComponents;
};
