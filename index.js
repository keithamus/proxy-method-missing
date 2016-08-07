module.exports = function (object, missingMethod) {
  const proxyObject = new Proxy(object, {
    get(object, property) {
      if (Reflect.has(object, property)) {
        return Reflect.get(object, property);
      } else {
        return (...args) => Reflect.apply(missingMethod, proxyObject, [property, ...args]);
      }
    }
  });
  return proxyObject;
}
