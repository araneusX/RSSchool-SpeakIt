export default (callback, className) => {
  return (attributes = {}, content = []) => {
    const thisAttributes = attributes;
    thisAttributes.className = Object.prototype.hasOwnProperty.call(attributes, 'className')
      ? `${className} ${attributes.className}` : className;
    return callback(thisAttributes, content);
  }
}
