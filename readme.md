## Proxy Method Missing



This super simple library makes it super simple to wrap Objects, adding a "missing method" hook, similar to [Ruby's method_missing](http://ruby-doc.org/core-2.1.0/BasicObject.html#method-i-method_missing), [PHP's __call](https://secure.php.net/manual/en/language.oop5.overloading.php#object.call).

If you want to read more about Proxies, you can read the accompanying blog post; [Metaprogramming in ES6: Part 3 - Proxies](https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-3-proxies/).

## Install:

```bash
npm i proxy-method-missing
```

## Usage:

Simply call the exported function with an object and a callback function, and it'll return a wrapped object back. Properties which exist on the original object are returned as is. Properties that don't exist on the original object resolve to a function which will call the passed callback, with the method name and arguments passed. To illustrate:

```js
const proxyMethodMissing = require('proxy-method-missing');
const example = proxyMethodMissing({
  add(a, b) {
    return a + b;
  }
}, (method, ...args) => console.log(`Sorry - no function ${method}(${args.join(' ')})`)));
example.add(1, 2); // 3
example.subtract(1, 2); // Sorry - no function subtract(1, 2);
```

See the tests for more examples

## Contributing:

Feel free to contribute in any way you see fit. Keep in mind this repo follows the [Contributor Covenant](http://contributor-covenant.org/).

## License

```
Copyright © 2016 Keith Cirkel

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
