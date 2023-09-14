### restArguments 概览

我们可以直接把方法名拆开理解，`rest`和 `arguments`。`arguments`不难理解，就是函数传入的参数。`rest`实际上就是类似 ES6 rest 参数。

`restArguments`方法 可以简单看成，处理 function 的 `this`指向 和参数 `arguments`。  
startIndex 主要是做了类似 ES6 rest 参数优化。

下面我们来详细看看`restArguments`方法

### 拆分分析

第一种，此时 rest 是 `[arguments[1], ...,arguments[arguments.length - 1]]`

```javascript
function r1(rest) {}
```

第二种，

```javascript
function r2(arguments[0],rest){}
```

第三种，

```javascript
function r3(arguments[0],arguments[1],rest){}
```

依次类推。
...

其中 switch 只是为了优化前 3 种。当 startIndex 为 0,1,2 的时候不会走到后续的循环，减少步骤。
大于 3 后就会将 arguments 和 rest 都放入了 arg 函数中。

```javascript
switch (startIndex) {
  case 0:
    return func.call(this, rest)
  case 1:
    return func.call(this, arguments[0], rest)
  case 2:
    return func.call(this, arguments[0], arguments[1], rest)
}
```

**有一点疑问：rest 为什么用数组绑定到函数上。**

### 示例加深理解

操作下面代码，观察`restArguments`的返回函数

```javascript
var raceResults = _.restArguments(function (
  gold,
  silver,
  bronze,
  everyoneElse
) {
  console.log(gold, silver, bronze, everyoneElse)
})

raceResults('Dopey', 'Grumpy', 'Happy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc')
// Dopey Grumpy Happy ['Sneezy', 'Bashful', 'Sleepy', 'Doc']
// restArguments 会把多余的参数放在最后一个参数，
```

```javascript
var raceResults = _.restArguments(function (
  gold,
  silver,
  bronze,
  everyoneElse
) {
  console.log(gold, silver, bronze, everyoneElse)
},
1)

raceResults('Dopey', 'Grumpy', 'Happy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc')
// Dopey ['Grumpy', 'Happy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc'] undefined undefined
// 传入1的时候，会把后面传入的参数都放在1后打印

var raceResults = _.restArguments(function (
  gold,
  silver,
  bronze,
  everyoneElse
) {
  console.log(gold, silver, bronze, everyoneElse)
},
4)

raceResults('Dopey', 'Grumpy', 'Happy', 'Sneezy', 'Bashful', 'Sleepy', 'Doc')
// Dopey Grumpy Happy Sneezy
// 传入大于等于4会自动只取前四个参数一一对应，多余参数不处理
```

### 源码

```javascript
// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
//有些函数接受可变数量的参数，或者一些预期的参数
//开头的参数，然后是可变数量的值来操作
//上。此助手累积函数后面的所有剩余参数
//参数长度（或显式的'startIndex'），变成一个数组
//最后一个参数。类似于ES6的“rest参数”。

export default function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex
  return function () {
    var length = Math.max(arguments.length - startIndex, 0),
      rest = Array(length),
      index = 0
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex]
    }
    switch (startIndex) {
      case 0:
        return func.call(this, rest)
      case 1:
        return func.call(this, arguments[0], rest)
      case 2:
        return func.call(this, arguments[0], arguments[1], rest)
    }
    var args = Array(startIndex + 1)
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index]
    }
    args[startIndex] = rest
    return func.apply(this, args)
  }
}
```
