---
title: 前言
author: 易函123
date: '2024-03-25'
---

## 概览

一个个看看下列判断类型的方法，和我们常规判断类型的`typeof` `Object.prototype.toString.call()`的区别。

```javascript
var _ = {
  isObject: isObject,
  isNull: isNull,
  isUndefined: isUndefined,
  isBoolean: isBoolean,
  isElement: isElement,
  isString: isString,
  isNumber: isNumber,
  isDate: isDate,
  isRegExp: isRegExp,
  isError: isError,
  isSymbol: isSymbol,
  isArrayBuffer: isArrayBuffer,
  isDataView: isDataView$1,
  isArray: isArray,
  isFunction: isFunction$1,
  isArguments: isArguments$1,
  isFinite: isFinite$1,
  isNaN: isNaN$1,
  isTypedArray: isTypedArray$1,
  isEmpty: isEmpty,
  isMatch: isMatch,
  isEqual: isEqual,
  isMap: isMap,
  isWeakMap: isWeakMap,
  isSet: isSet,
  isWeakSet: isWeakSet,
}
```

## isObject

> 判断是否对象

```javascript
// 判断是否是对象
function isObject(obj) {
  var type = typeof obj
  return type === 'function' || (type === 'object' && !!obj)
}
```

- `typeof` 返回为’function‘
- `typeof` 返回为'object'并且`!!obj`，这个条件主要是排出 `null`

相关示例

```javascript
console.log(_.isObject({})) // true
console.log(_.isObject(null)) // false
console.log(_.isObject(1)) // false
console.log(_.isObject(new Number())) // true
console.log(_.isObject(true)) // false
console.log(_.isObject(new Boolean())) // true
console.log(_.isObject('1')) // false
console.log(_.isObject(new String())) // true
const fn = function f() {}
console.log(_.isObject(fn)) // true
console.log(_.isObject([])) // true
console.log(_.isObject(new Date())) // true
```

通过下面的示例，不难看出：

1. 函数和数组属于对象。null 不是对象。
2. 1 不属于对象 `new Number()`属于对象
3. ‘1’不属于对象 `new String()`属于对象
4. true 不属于对象 `new Boolean()`属于对象

## isNull

> null 虽然 typeof，返回是'object'，但是它还是属于 null 类型，如何判断呢。

```javascript
// 判断是否为null
// Is a given value equal to null?
function isNull(obj) {
  return obj === null
}
```

相关示例

```javascript
_.isNull(null);
=> true
_.isNull(undefined);
=> false
```

## isUndefined

> 既然 null 使用全等判断的，那么 `undefined` 为何是全等 `void 0`

```javascript
// Is a given variable undefined?
// 判断是否为undefined
function isUndefined(obj) {
  return obj === void 0
}
```

相关示例

```javascript
_.isUndefined(window.missingVariable);
_.isUndefined(undefined);
=> true

console.log(undefined === void 0) //true
console.log(undefined === void 1) //true
console.log(undefined === void (new Date())) //true
```

`void` 运算符能对给定的表达式进行求值，然后返回 `undefined`。

## isBoolean

> 判断是否为 Boolean

```javascript
// 判断是否为Boolean
function isBoolean(obj) {
  return (
    obj === true || obj === false || toString.call(obj) === '[object Boolean]'
  )
}
```

思考：为啥不直接用`toString.call(obj) === '[object Boolean]')`?

```javascript
const Proto = Object.prototype.toString

console.log(Proto.call(true)) // '[object Boolean]'
console.log(Proto.call(false)) // '[object Boolean]'

console.log(Proto.call(new Boolean(true))) // '[object Boolean]'
console.log(true === new Boolean(true)) // false
console.log(false === new Boolean(false)) // false
console.log(new Boolean(0)) // Boolean {false}
console.log(typeof new Boolean(0)) // 'object'
```

对于`new Boolean` `typeof`返回的是对象。但是`Object.prototype.toString.call()`返回的是'[object Boolean]'。
很明显 underscore 返回的是 true.

## isElement

> 判断是否为 elements

```javascript
// 判断是否为element
function isElement(obj) {
  return !!(obj && obj.nodeType === 1)
}
```

让我们看看对创建 Element 判断是怎样

```javascript
const div = document.createElement('div')
const img = document.createElement('img')
console.log(_.isElement(div)) // true
console.log(_.isElement(img)) // true
```

## function tagTester

> 实际上就是对`Object.prototype.toString.call()`做了些不同返回的处理

```javascript
function tagTester(name) {
  var tag = '[object ' + name + ']'
  // `[object ${name}]` 个人觉得模板字符串更好看。
  return function (obj) {
    return toString.call(obj) === tag
  }
}
```

## isString

> 判断是否字符串，还需要验证下 new String()

```javascript
var isString = tagTester('String')
```

验证下`new String()`

```javascript
console.log(_.isString(new String())) // true
console.log(typeof new String()) // 'object'
```

## isNumber

> 判断是否数字

```javascript
var isNumber = tagTester('Number')
```

验证下`new Number()`

```javascript
console.log(_.isNumber(new Number())) // true
console.log(typeof new Number()) // 'object'
```

## isDate

> 判断是否日期对象

```javascript
var isDate = tagTester('Date')
```

`new Date()`既可以认为是对象，也可以认为是 Date。这个是没问题的。

```javascript
console.log(_.isDate(new Date())) // true
console.log(_.isObject(new Date())) // true
console.log(typeof new Date()) // 'object'
```

## isRegExp

> 判断是否正则

```javascript
var isRegExp = tagTester('RegExp')
```

正则也是

```javascript
console.log(_.isRegExp(new RegExp())) // true
console.log(_.isRegExp(/moe/)) // true
console.log(_.isObject(new RegExp())) // true
console.log(typeof new RegExp()) // 'object'
```

## isError

> 判断是否报错

```javascript
var isError = tagTester('Error')
```

示例

```javascript
try {
  throw new Error('Example')
} catch (err) {
  console.log(_.isError(err)) //true
}

try {
  throw new TypeError('Example')
} catch (err1) {
  console.log(_.isError(err1)) // true
}
```

## isSymbol

> 判断是否 Symbol

```javascript
var isSymbol = tagTester('Symbol')
```

示例

```javascript
console.log(_.isSymbol(Symbol())) // true
console.log(typeof Symbol()) // 'symbol'
```

## isArrayBuffer

> 判断是否 isArrayBuffer

```javascript
var isArrayBuffer = tagTester('ArrayBuffer')
```

示例

```javascript
const buffer = new ArrayBuffer(8)
console.log(_.isSymbol(buffer)) // true
console.log(typeof buffer) // 'object'
```

## isFunction

> 判断是否函数

isFunction$1 主要是解决部分老版本的 bug

```javascript
var isFunction = tagTester('Function')

// Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
// v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
var nodelist = root.document && root.document.childNodes
if (
  typeof /./ != 'function' &&
  typeof Int8Array != 'object' &&
  typeof nodelist != 'function'
) {
  isFunction = function (obj) {
    return typeof obj == 'function' || false
  }
}

var isFunction$1 = isFunction
```

示例

```javascript
const fn = function () {}
async function f() {}
console.log(_.isFunction(fn)) // true
console.log(typeof fn) // 'function'
console.log(_.isFunction(f)) // true
console.log(typeof f) // 'function'
```

## isDataView

> 判断是否 DataView，DataView 视图是一个可以从二进制 ArrayBuffer 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的字节序（endianness）问题。

正常有 DataView 的浏览器，isDataView 的判断就能满足

```javascript
var isDataView = tagTester('DataView')
```

那么整体实现还需做哪些兼容性判断呢？先看看下面的二元运算：

```javascript
var isDataView$1 = hasStringTagBug ? ie10IsDataView : isDataView
```

`supportsDataView`:`typeof DataView !== 'undefined'`也就是`DataView`不等于`undefined`;

`hasObjectTag`:是判断`new DataView(new ArrayBuffer(8)`是否对象。

如果二者都满足就取`ie10IsDataView`,否则就正常返回`isDataView`。

我们先看看`new DataView(new ArrayBuffer(8)`在 chrome 和 edge 的返回：

```javascript
Object.prototype.toString.call(new DataView(new ArrayBuffer(8))) // chrome: 返回 '[object Object]'
Object.prototype.toString.call(new DataView(new ArrayBuffer(8))) // edge: 返回 '[object DataView]'
```

在 chrome 打印是`'[object Object]'`还需要排除几个属于 object 类型的数据。也就是下面介绍的`ie10IsDataView`

```javascript
function ie10IsDataView(obj) {
  return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer)
}
```

- 不难看出，排除了`null`的干扰：`obj!=null`;
- `getInt8`是`DataView`携带的方法。
- `buffer` 属性描述了在构造时被 `DataView`引用的 `ArrayBuffer`。

后续的`isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer)`，运用`DataView`的独特方法和属性结合来判断。

```javascript
var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
  supportsDataView = typeof DataView !== 'undefined'
var hasObjectTag = tagTester('Object')
var isDataView = tagTester('DataView')
var hasStringTagBug =
    supportsDataView && hasObjectTag(new DataView(new ArrayBuffer(8))),
  isIE11 = typeof Map !== 'undefined' && hasObjectTag(new Map())

// In IE 10 - Edge 13, we need a different heuristic
// to determine whether an object is a `DataView`.
// 也就是在chrome打印出来的是'[object Object]'，所以还需排出相应数据。
function ie10IsDataView(obj) {
  return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer)
}

var isDataView$1 = hasStringTagBug ? ie10IsDataView : isDataView
```

## isArray

> 判断是否数组

```javascript
var nativeIsArray = Array.isArray
// Delegates to ECMA5's native `Array.isArray`.
var isArray = nativeIsArray || tagTester('Array')
```

运用`Array.isArray`和`Object.prototype.toString.call()`结合判断 Array

示例

```javascript
// new Array()到底是对象还是数组
console.log(_.isArray([])) // true
console.log(_.isArray(new Array())) // true
console.log(typeof new Array()) // 'object'
console.log(Object.prototype.toString.call(new Array())) // [object Array]

// Array(1) 是对象还是数组
console.log(Array(1)) // [empty]
console.log(_.isArray(Array(1))) // true
console.log(typeof Array(1)) // 'object'
console.log(Object.prototype.toString.call(Array(1))) // [object Array]
```

## isFunction

> 判断是否函数

还是运用`Object.prototype.toString.call()`来判断是否函数。

然后对老版本进行处理。如果在老版本返回的是`typeof obj == 'function'` 就被认为是函数。

```javascript
var isFunction = tagTester('Function')

// Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
// v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
// 处理老版本函数返回
var nodelist = root.document && root.document.childNodes
if (
  typeof /./ != 'function' &&
  typeof Int8Array != 'object' &&
  typeof nodelist != 'function'
) {
  isFunction = function (obj) {
    return typeof obj == 'function' || false
  }
}

var isFunction$1 = isFunction
```

## isArguments

> isArguments(object), 如果 object 是一个参数对象，返回 true。

- 首先，`var isArguments = tagTester('Arguments')`就已经返回 `true` 或者 `false` 了。这里返回 true 后不做任何处理。但是如果返回 false,就会往后执行
- 然后，后面的函数`has$1`是判断原型上是否有`callee`属性。这里也是为了兼容 IE 小于 9 的版本。
- 后面的自调用函数，主要是对 `!isArguments`的判断做了重新赋值，从而处理老版本的`arguments`的判断.

```javascript
var isArguments = tagTester('Arguments')
function has$1(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key)
}
// Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.
;(function () {
  if (!isArguments(arguments)) {
    isArguments = function (obj) {
      return has$1(obj, 'callee')
    }
  }
})()

var isArguments$1 = isArguments
```

示例：

```javascript
function fn(obj) {
  console.log(_.isArguments(obj), _.isArguments(arguments))
}

fn(1, 2, 3)
// false true
fn()
// false true
fn(1)
// false true
fn(null)
// false true
```

## isFinite

> 判断有限的数字

```javascript
var _isFinite = isFinite
// Is a given object a finite number?
function isFinite$1(obj) {
  return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj))
}
```

- 不是`Symbol`类型
- `isFinite`处理返回`true`
- 用`parseFloat`处理后不是`NaN`

三个条件必须同时满足。

示例

```javascript
console.log(_.isFinite(Infinity)) // false
console.log(_.isFinite(-Infinity)) // false
console.log(_.isFinite(Math.pow(2, 39))) // true
console.log(_.isFinite(Math.PI)) // true
console.log(Math.PI) // 3.141592653589793
```

## isNaN

> 判断是否为`NaN`

```javascript
var _isNaN = isNaN
function isNaN$1(obj) {
  return isNumber(obj) && _isNaN(obj)
}
```

是 `Number`类型并且`isNaN`返回需要为`true`

示例：

```javascript
console.log(_.isNaN(NaN)) // true
console.log(_.isNaN(parseInt('abc'))) // true
```

## isTypedArray

>

```javascript
// Modern feature detection.
var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
  supportsDataView = typeof DataView !== 'undefined'
var nativeIsView = supportsArrayBuffer && ArrayBuffer.isView
var typedArrayPattern =
  /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/
function isTypedArray(obj) {
  // `ArrayBuffer.isView` is the most future-proof, so use it when available.
  // Otherwise, fall back on the above regular expression.
  return nativeIsView
    ? nativeIsView(obj) && !isDataView$1(obj)
    : isBufferLike(obj) && typedArrayPattern.test(toString.call(obj))
}

var isTypedArray$1 = supportsArrayBuffer ? isTypedArray : constant(false)
```

## isEmpty

> _.isEmpty(object)
> 如果 object 不包含任何值(没有可枚举的属性)，返回 true。 对于字符串和类数组（array-like）对象，如果 length 属性为 0，那么_.isEmpty 检查返回 true。

函数`shallowProperty`主要是获取对象的属性。`getLength`实际上就是获取对象的`length`属性。

```javascript
function shallowProperty(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key]
  }
}
// Internal helper to obtain the `length` property of an object.
var getLength = shallowProperty('length')
// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
function isEmpty(obj) {
  if (obj == null) return true
  // Skip the more expensive `toString`-based type checks if `obj` has no
  // `.length`.
  var length = getLength(obj)
  if (
    typeof length == 'number' &&
    (isArray(obj) || isString(obj) || isArguments$1(obj))
  )
    return length === 0
  return getLength(keys(obj)) === 0
}
```

示例：

> 数组的长度不为空，内部为空，在 underscore 认为不是空。（Array(3), [, , ,]）

```javascript
console.log(
  _.isEmpty([1, 2, 3]),
  _.isEmpty([]),
  _.isEmpty(Array(3)),
  _.isEmpty([, , ,]),
  _.isEmpty({})
) // false true false false true

console.log(Array(3), [, , ,]) // [empty × 3] [empty × 3]
```

## isMatch

> 键和值是否包含

下面的代码，我们先直接分析主函数。然后在一个个去看其他函数是什么意思。

首先在`object==null`时， 直接返回!length。这是上半部分。  
下半部分则是直接遍历获取\_keys，看遍历返回的 key 是否在对象里。如果有一个不在就会直接返回 false，全部都在的话就会全部返回 true.

```javascript
function isMatch(object, attrs) {
  var _keys = keys(attrs),
    length = _keys.length //
  if (object == null) return !length //如果传入对象为null 直接返回!length。
  var obj = Object(object)
  for (var i = 0; i < length; i++) {
    var key = _keys[i]
    if (attrs[key] !== obj[key] || !(key in obj)) return false
  }
  return true
}
```

接下来我们看看`keys`到底对 attrs 做了什么处理。

```javascript
function keys(obj) {
  if (!isObject(obj)) return []
  if (nativeKeys) return nativeKeys(obj)
  var keys = []
  for (var key in obj) if (has$1(obj, key)) keys.push(key)
  // Ahem, IE < 9.
  if (hasEnumBug) collectNonEnumProps(obj, keys)
  return keys
}
```

1. 第一种情况：如果 attrs 不是对象就会返回空数组。在`return !length`就会直接返回 true。
2. 第二种情况：如果 存在`nativeKeys`也就是`var nativeKeys = Object.keys`.Object.keys() 静态方法返回一个由给定对象自身的可枚举的字符串键属性名组成的数组。其实也是返回的属性名组成的数组。
3. 第三种情况：正常遍历对象。通过`has$1(obj, key)`，也就是`Object.prototype.hasOwnProperty()`。hasOwnProperty() 方法返回一个布尔值，表示对象自有属性（而不是继承来的属性）中是否具有指定的属性。将对象的自有属性名放到数组中。
4. 第四种情况：对 ie 出现 bug 的特殊处理`// Ahem, IE < 9.if (hasEnumBug) collectNonEnumProps(obj, keys)`。

上述这四种情况，总结来说就是把自有属性，全部放在数组中，通过`keys`函数返回。后续只是通过遍历`_keys`，看`attrs`中的自有属性是否都在 obj 中存在。都存在返回 true，有一个不存在就返回 false。

```javascript
for (var i = 0; i < length; i++) {
  var key = _keys[i]
  if (attrs[key] !== obj[key] || !(key in obj)) return false
}
```

源码部分

```javascript
function shallowProperty(key) {
  return function (obj) {
    // 如果是null就返回void 0,否则返回对象的对应属性
    return obj == null ? void 0 : obj[key]
  }
}
// Internal helper to obtain the `length` property of an object.
// 为了获取对象的的长度
var getLength = shallowProperty('length')
var nativeKeys = Object.keys
// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString')
var nonEnumerableProps = [
  'valueOf',
  'isPrototypeOf',
  'toString',
  'propertyIsEnumerable',
  'hasOwnProperty',
  'toLocaleString',
]

function has$1(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key)
}

// Internal helper to create a simple lookup structure.
// `collectNonEnumProps` used to depend on `_.contains`, but this led to
// circular imports. `emulatedSet` is a one-off solution that only works for
// arrays of strings.
function emulatedSet(keys) {
  var hash = {}
  for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true
  return {
    contains: function (key) {
      return hash[key] === true
    },
    push: function (key) {
      hash[key] = true
      return keys.push(key)
    },
  }
}
// Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
// be iterated by `for key in ...` and thus missed. Extends `keys` in place if
// needed.
function collectNonEnumProps(obj, keys) {
  keys = emulatedSet(keys)
  var nonEnumIdx = nonEnumerableProps.length
  var constructor = obj.constructor
  var proto = (isFunction$1(constructor) && constructor.prototype) || ObjProto

  // Constructor is a special case.
  var prop = 'constructor'
  if (has$1(obj, prop) && !keys.contains(prop)) keys.push(prop)

  while (nonEnumIdx--) {
    prop = nonEnumerableProps[nonEnumIdx]
    if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
      keys.push(prop)
    }
  }
}
function keys(obj) {
  if (!isObject(obj)) return []
  if (nativeKeys) return nativeKeys(obj)
  var keys = []
  for (var key in obj) if (has$1(obj, key)) keys.push(key)
  // Ahem, IE < 9.
  if (hasEnumBug) collectNonEnumProps(obj, keys)
  return keys
}
// Returns whether an object has a given set of `key:value` pairs.
function isMatch(object, attrs) {
  var _keys = keys(attrs),
    length = _keys.length
  if (object == null) return !length
  var obj = Object(object)
  for (var i = 0; i < length; i++) {
    var key = _keys[i]
    if (attrs[key] !== obj[key] || !(key in obj)) return false
  }
  return true
}
```

## isEqual

> 执行两个对象之间的优化深度比较，确定他们是否应被视为相等。

```javascript
// Perform a deep comparison to check if two objects are equal.
function isEqual(a, b) {
  return eq(a, b)
}
// If Underscore is called as a function, it returns a wrapped object that can
// be used OO-style. This wrapper holds altered versions of all functions added
// through `_.mixin`. Wrapped objects may be chained.
function _$1(obj) {
  if (obj instanceof _$1) return obj
  if (!(this instanceof _$1)) return new _$1(obj)
  this._wrapped = obj
}

// Internal recursive comparison function for `_.isEqual`.
function deepEq(a, b, aStack, bStack) {
  // Unwrap any wrapped objects.
  if (a instanceof _$1) a = a._wrapped
  if (b instanceof _$1) b = b._wrapped
  // Compare `[[Class]]` names.
  var className = toString.call(a)
  if (className !== toString.call(b)) return false
  // Work around a bug in IE 10 - Edge 13.
  if (hasStringTagBug && className == '[object Object]' && isDataView$1(a)) {
    if (!isDataView$1(b)) return false
    className = tagDataView
  }
  switch (className) {
    // These types are compared by value.
    case '[object RegExp]':
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case '[object String]':
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return '' + a === '' + b
    case '[object Number]':
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) return +b !== +b
      // An `egal` comparison is performed for other numeric values.
      return +a === 0 ? 1 / +a === 1 / b : +a === +b
    case '[object Date]':
    case '[object Boolean]':
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b
    case '[object Symbol]':
      return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b)
    case '[object ArrayBuffer]':
    case tagDataView:
      // Coerce to typed array so we can fall through.
      return deepEq(toBufferView(a), toBufferView(b), aStack, bStack)
  }

  var areArrays = className === '[object Array]'
  if (!areArrays && isTypedArray$1(a)) {
    var byteLength = getByteLength(a)
    if (byteLength !== getByteLength(b)) return false
    if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true
    areArrays = true
  }
  if (!areArrays) {
    if (typeof a != 'object' || typeof b != 'object') return false

    // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.
    var aCtor = a.constructor,
      bCtor = b.constructor
    if (
      aCtor !== bCtor &&
      !(
        isFunction$1(aCtor) &&
        aCtor instanceof aCtor &&
        isFunction$1(bCtor) &&
        bCtor instanceof bCtor
      ) &&
      'constructor' in a &&
      'constructor' in b
    ) {
      return false
    }
  }
  // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.
  aStack = aStack || []
  bStack = bStack || []
  var length = aStack.length
  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b
  }

  // Add the first object to the stack of traversed objects.
  aStack.push(a)
  bStack.push(b)

  // Recursively compare objects and arrays.
  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length
    if (length !== b.length) return false
    // Deep compare the contents, ignoring non-numeric properties.
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false
    }
  } else {
    // Deep compare objects.
    var _keys = keys(a),
      key
    length = _keys.length
    // Ensure that both objects contain the same number of properties before comparing deep equality.
    if (keys(b).length !== length) return false
    while (length--) {
      // Deep compare each member
      key = _keys[length]
      if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack))) return false
    }
  }
  // Remove the first object from the stack of traversed objects.
  aStack.pop()
  bStack.pop()
  return true
}
```

## isMap

> 判断是否 是一个 Map 数据结构

```javascript
var isFunction = tagTester('Function')

// Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
// v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
// 处理老版本函数返回
var nodelist = root.document && root.document.childNodes
if (
  typeof /./ != 'function' &&
  typeof Int8Array != 'object' &&
  typeof nodelist != 'function'
) {
  isFunction = function (obj) {
    return typeof obj == 'function' || false
  }
}

var isFunction$1 = isFunction
// Since the regular `Object.prototype.toString` type tests don't work for
// some types in IE 11, we use a fingerprinting heuristic instead, based
// on the methods. It's not great, but it's the best we got.
// The fingerprint method lists are defined below.
function ie11fingerprint(methods) {
  var length = getLength(methods)
  return function (obj) {
    if (obj == null) return false
    // `Map`, `WeakMap` and `Set` have no enumerable keys.
    var keys = allKeys(obj)
    if (getLength(keys)) return false
    for (var i = 0; i < length; i++) {
      if (!isFunction$1(obj[methods[i]])) return false
    }
    // If we are testing against `WeakMap`, we need to ensure that
    // `obj` doesn't have a `forEach` method in order to distinguish
    // it from a regular `Map`.
    return methods !== weakMapMethods || !isFunction$1(obj[forEachName])
  }
}
// In the interest of compact minification, we write
// each string in the fingerprints only once.
var forEachName = 'forEach',
  hasName = 'has',
  commonInit = ['clear', 'delete'],
  mapTail = ['get', hasName, 'set']
// `Map`, `WeakMap` and `Set` each have slightly different
// combinations of the above sublists.
var mapMethods = commonInit.concat(forEachName, mapTail),
  weakMapMethods = commonInit.concat(mapTail),
  setMethods = ['add'].concat(commonInit, forEachName, hasName)
var hasObjectTag = tagTester('Object')
// 通过Map!==undefined并且，new Map()是对象，来判断isIE11
var isIE11 = typeof Map !== 'undefined' && hasObjectTag(new Map())

var isMap = isIE11 ? ie11fingerprint(mapMethods) : tagTester('Map')

var isWeakMap = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester('WeakMap')

var isSet = isIE11 ? ie11fingerprint(setMethods) : tagTester('Set')

var isWeakSet = tagTester('WeakSet')
```

上面都是利用`Object.prototype.toString.call()`判断其类型。

通过`Map!==undefined`并且，`new Map()`是对象，来判断是否在 ie11 环境。isIE11。

而`commonInit`是将所有的原型方法进行组合，例如 set 的‘add’和‘has’方法。

## isWeakMap

> 判断是否 是一个 isWeakMap 数据结构

## isSet

> 判断是否 是一个 isSet 数据结构

## isWeakSet

> 判断是否 是一个 isWeakSet 数据结构
