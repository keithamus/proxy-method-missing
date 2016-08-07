const assert = require('assert');
const proxyMethodMissing = require('./');

const example = proxyMethodMissing({
  foo() {
    return 'present';
  },
  bar() {
    return 'present';
  }
}, () => 'missing')
assert.equal(example.foo(), 'present');
assert.equal(example.bar(), 'present');
assert.equal(example.baz(), 'missing');
assert.equal(example.bing(), 'missing');
assert.equal(example.missing_method(), 'missing');

class Foo {
  foo() {
    return { context: this, present: true };
  }
  inspect() {
    return (typeof this[404] === 'function' ? 'Proxy' : '') + 'Foo {}';
  }
}
const instance = proxyMethodMissing(new Foo, function () {
  return { context: this, present: false }
});
assert.equal(instance.foo().context, instance);
assert.equal(instance.bar().context, instance);
assert.equal(instance.foo().present, true);
assert.equal(instance.bar().present, false);
assert.equal(instance.baz().context, instance);
assert.equal(instance.missing_method().context, instance);
assert.equal(instance.baz().present, false);
assert.equal(instance.missing_method().present, false);


const bases = proxyMethodMissing({}, function (methodName, fromString) {
  const [isBaseMethod, fromBase, toBase] = methodName.match(/base(\d+)toBase(\d+)/) || [false];
  if (!isBaseMethod || fromBase > 36 || toBase > 36 || fromBase < 2 || toBase < 2) {
    throw new Error(`TypeError: ${this}.${methodName} is not a function`);
  }
  return parseInt(fromString, fromBase).toString(toBase);
});

assert.equal(bases.base16toBase10('F'), '15');
assert.equal(bases.base16toBase6('abc'), '20420');
assert.equal(bases.base16toBase5('abc'), '41443');
assert.equal(bases.base16toBase4('abc'), '222330');
assert.equal(bases.base16toBase3('abc'), '10202210');
assert.equal(bases.base16toBase2('abc'), '101010111100');
assert.equal(bases.base2toBase16('101010111100'), 'abc');
assert.equal(bases.base3toBase16('10202210'), 'abc');
assert.equal(bases.base4toBase16('222330'), 'abc');
assert.equal(bases.base5toBase16('41443'), 'abc');
assert.equal(bases.base6toBase16('20420'), 'abc');
assert.equal(bases.base12toBase34('baba'), 'hrk');
assert.equal(bases.base36toBase18('lkdjas'), '2262053a');
assert.equal(bases.base16toBase12('deadbeef'), '8831a383b');
assert.equal(bases.base16toBase2('deadbeef'), '11011110101011011011111011101111');
assert.throws(() => bases.throw('deadbeef'));
assert.throws(() => bases.base1000to1000('deadbeef'));

function RecordFinder(options) {
  return new Proxy({}, {
    get(object, methodName) {
      return function findProxy(...values) {
        var fields = methodName.match(new RegExp('findBy((?:And)?(' + options.columns.join('|') + '))+', 'i'));
        if (!fields){
          throw new Error('TypeError: ' + methodName + ' is not a function');
        }
        let select = `SELECT * FROM ${options.table} WHERE`;
        fields.pop();
        for (i in fields) {
          select += `${i === 0? '' : ' AND'} ${fields[i]}="${values[i]}"`;
        }
        return select;
      };
    }
  });
}

const exampleRecordFinder = new RecordFinder({
  table: 'foo',
  columns: ['firstName', 'lastName']
});
assert(exampleRecordFinder.findByFirstName('Keith'), 'SELECT * FROM WHERE firstName="Keith"')
assert(exampleRecordFinder.findByFirstNameAndLastName('Keith', 'Cirkel'), 'SELECT * FROM WHERE firstName="Keith"')


console.log('All Pass :)');
