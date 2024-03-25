## 1. 概览

ES6 新增了两个定义变量的关键字：`let` 与 `const`，它们几乎取代了 ES5 定义变量的方式：`var`。`let`是新的`var`,`const`简单的常量声明。

```javascript
function f() {
  {
    let x
    {
      // okay, block scoped name
      const x = 'sneaky'
      // error, const
      x = 'foo'
    }
    // error, already declared in block
    let x = 'inner'
  }
}
```

ES6 之前变量之前存在两个问题：

- JS 没有块级作用域。在 JS 函数中的 var 声明，其作用域是函数体的全部。
- 循环内变量过度共享

## 2. 块级作用域

`let`,`const`创建的变量都是**块级作用域**：它们只存在包围它们的最深代码块中。

作用域有哪些？

- 块级作用域
- 函数作用域
- 全局作用域

```javascript
function func() {
  if (true) {
    let tmp = 123
    // const tmp = 123;
  }
  console.log(tmp) // ReferenceError: tmp is not defined
}
console.log(tmp) // ReferenceError: tmp is not defined
```

相比之下，`var`声明的是函数域。

```javascript
function func() {
  if (true) {
    var tmp = 123
  }
  console.log(tmp) // 123
}
func()
console.log(tmp) // tmp is not defined
```

下面的式子更难看出函数作用域与块级作用域的区别

```javascript
function myFunc() {
  var number1 = 15 // 函数作用域
  if (true) {
    let number1 = 20 // 块级作用域
    console.log(number1) // 20
  }
  console.log(number1) // 15
}
myFunc()
console.log(number1) // number1 is not defined
```

而全局作用域，可以从 JavaScript 程序中的任何位置访问。

```javascript
var number1 = 15
console.log(window.number1, globalThis.number1, window === globalThis) // 15 15 true
```

**面试题：循环中定时器闭包**

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i) //5, 5, 5, 5, 5
  }, 0)
}
console.log(i) //5 i跳出循环体污染外部函数

//将var改成let之后
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i) // 0,1,2,3,4
  }, 0)
}
console.log(i) //i is not defined i无法污染外部函数
```

在 for 循环中使用 var 声明的循环变量，会跳出循环体污染当前的函数。

## 3. TDZ

> `let`、`const`暂时性死区（temporal dead zone）

`let`,`const`声明的变量拥有**暂时性死区**：当进入它的作用域，它不能被访问（获取或设置）直到执行到达声明。  
简单描述：

```javascript
if (true) {
  //这块区域是TDZ
  console.log(a) // Uncaught ReferenceError: Cannot access 'a' before initialization
  let a = 1
  // const a = 1
}
```

```javascript
if (true) {
  // enter new scope, TDZ starts
  // Uninitialized binding for `tmp` is created

  tmp = 'abc' // ReferenceError
  console.log(tmp) // ReferenceError

  let tmp // TDZ ends, `tmp` is initialized with `undefined`
  console.log(tmp) // undefined

  tmp = 123
  console.log(tmp) // 123
}
```

下面示例将演示死区（dead zone）是真正短暂时间的（基于时间）和不受空间条件限制（基于位置）

```javascript
if (true) {
  // enter new scope, TDZ starts
  const func = function () {
    console.log(myVar) // OK!
  }

  // Here we are within the TDZ and
  // accessing `myVar` would cause a `ReferenceError`

  let myVar = 3 // TDZ ends
  func() // called outside TDZ
}
```

上面的例子我们可以清楚的看到 let myVar 变量被定义了，但是不像 var 一样被提升。那它初始化了吗？没有，这就是 TDZ 在进入块级作用域就存在的原因。基本上，当 let myVar 将被定义时，它将进入 TDZ，并在您声明和初始化它时结束。所以在范围中，它将首先在 TDZ 中，但是一旦到达声明部分，TDZ 就会结束。

#### 为什么会存在 TDZ?

- 它帮助我们发现错误。
- 在声明变量之前尝试访问它是错误的方式。

> 为避免 TDZ，请始终确保在任何范围的顶部定义 let 和 const。

我们可以通过分解来简单地理解这个术语。时间意味着暂时的东西，死亡意味着没有生命的状态，编程世界中与内存相关的区域。所以变量暂时不可用（或死亡）的时区在 TDZ 中。

或者简单地说，进入块级作用域与其变量创建声明之间的时间跨度称为时间死区。

## 4. 变量提升

> `var`变量提升

JavaScript 中，我们通常说的作用域是函数作用域，使用 var 声明的变量，无论是在代码的哪个地方声明的，都会提升到当前作用域的最顶部，这种行为叫做**变量提升（Hoisting）**

下面代码，演示了函数的变量提升：

```javascript
{
  // Enter a new scope

  console.log(foo()) // hello, due to hoisting
  function foo() {
    return 'hello'
  }
}
```

也就是说，如果在函数内部声明的变量，都会被提升到函数开头，而在全局的声明，就会提升到全局作用域的顶部。

```javascript
function test() {
  console.log('1: ', a) //undefined
  if (false) {
    var a = 1
  }
  console.log('3: ', a) //undefined
}

test()
```

实际执行时，上面的代码中的变量 a 会提升到函数顶部声明，即使 if 语句的条件是 false，也一样不影响 a 的提升。

```javascript
function test() {
  var a
  //a声明没有赋值
  console.log('1: ', a) //undefined
  if (false) {
    a = 1
  }
  //a声明没有赋值
  console.log('3: ', a) //undefined
}
```

在嵌套函数的情况，变量只会提升到最近一个函数的顶部，而不会到外部函数。

```javascript
//b提升到函数a顶部，但不会提升到函数test。
function test() {
  function a() {
    if (false) {
      var b = 2
    }
  }
  console.log('b: ', b)
}

test() //b is not defined
```

## 5. 不允许重复声明

> `let`不允许重复声明

`let`不允许在相同作用域内，重复声明同一个变量。

```javascript
// 报错
function func() {
  let a = 10
  var a = 1
}

// 报错
function func() {
  let a = 10
  let a = 1
}
```

因此在函数内部不能重新声明函数

```javascript
function func(arg) {
  let arg
}
func() // 报错 Identifier 'arg' has already been declared

function func(arg) {
  {
    let arg
  }
}
func() // 不报错
```

## 6. const 命令

> const 声明一个只读的常量。一旦声明，常量的值就不能改变。

一般使用场景：

```javascript
const start = 'hi all'

const getName = () => {
  return 'jelly'
}

const conf = {
  fav: 'Coding',
}

// 模板
const msg = `${start}, my name is ${getName()}, ${conf.fav} is my favourite`
```

你可能不知道的事：

```javascript
// 1. 与引号混用
const wantToSay = `I'm a "tbfed"`

// 2. 支持多行文本
const slogan = `
I have a dream today!
`

// 比较适合写HTML
const resultTpl = `
  <section>
    <div>...</div>
  </section>
`
```

> 在 JavaScript 中，const 仅表示绑定（变量名和变量值之间的关联）是不可变的。值本身可能是可变的，如以下示例中的 obj。

```javascript
const obj = { prop: 0 }
obj.prop = obj.prop + 1
console.log(obj.prop) // 1
```

## 7. 全局变量和全局对象

在 Web 浏览器中，唯一直接位于该范围内的位置是脚本的顶层。全局范围的变量称为全局变量，可以随处访问。有两种全局变量：

- 全局声明变量是普通变量。
  它们只能在脚本的顶层通过 const、let 和类声明创建。
- 全局对象变量被存储在所谓全局对象的属性中。
  它们是在脚本的顶层通过 var 和函数声明创建的。
  可以通过全局变量 globalThis 访问全局对象，它可以用来创建、读取和删除全局对象变量。
  除此之外，全局对象变量像普通变量一样工作。

```javascript
window === globalThis // true

console.log(window.a) // 1
var a = 1
console.log(window.a) // 1
```

## 8. 区别

`var`、`let`和`const`是 JavaScript 用来存储和声明变量的特殊关键字。它们每个都有唯一性（差异），将简要讨论。

- **相同点**：`var`,`let`,`const`声明的变量，是不能被`delete`的;
- **区别**：

`var`:

- var 分别具有全局和函数作用域，也就是说，定义在函数外部的变量可以全局访问，定义在特定函数内部的变量只能在函数内部访问。
- 其次，用户可以使用 var 重新声明变量，用户可以更新 var 变量。
- 如果用户在声明之前使用 var 变量，它会使用未定义的值进行初始化，值为 undefined。

`let`:

- let 变量的作用域仅为块作用域。它不能在特定功能块之外访问，let 关键字是 var 关键字的改进版本。
- 用户不能重新声明使用 let 关键字定义的变量，但可以更新它。
- 用户可以使用 let 关键字在不同的功能块中声明同名变量。
- 无需初始化即可声明。

`const`:

- const 变量的作用域是块作用域。
- 它不能更新或重新声明到范围内
- 没有初始化就不能声明

**变量提升**：`var`声明的变量存在变量提升，即变量可以在声明之前调用，值为 undefined；  
`let`,`const`不存在变量提升，即它们声明的变量一定要在声明后使用，否则会报错。

**暂时性死区**：`var`不存在暂时性死区；`let`、`const`存在暂时性死区，只有等声明变量后，才可以获取和使用该变量。

**重复声明**：`var`允许重复声明；`lat`、`const`在同一作用域不允许重复声明。

**修改声明的变量**：`var`和`let`可以修改声明的变量；`const`声明一个只读常量，一旦声明，常量的值就不能改变。

## 9. 面试题

### 1.请问 var、let 和 const 有何区别？

**作用域不同：**

var 声明的变量的作用域是当前执行上下文，或者说对于声明在任何函数外的变量来说是全局的

let 、 const 声明的是块级作用域变量，只在它所在的代码块内有效

**变量提升现象：**

var 声明的变量会被提升到作用域顶部，并初始化为 undefined

let、 const 声明的变量会被提升到顶部，但在声明代码前不能使用（暂时性死区），会被初始化 undefined

**变量/常量：**

var 和 let 声明变量，const 声明只读常量

**暂时性死区：**

var 可以先使用，后声明，值为 undefined

let 、const 必须先声明，后使用；且 const 必须初始化赋值

在 let、const 声明之前就访问对应的变量与常量，会抛出 ReferenceError，产生原因：

由 let/const 声明的变量，当它们包含的词法环境(Lexical Environment)被实例化时会被创建，但只有在变量的词法绑定(LexicalBinding)已经被求值运算后，才能够被访问（摘自 ES2015 语言标准）

简单来说：用 let/const 声明的变量会先在作用域中被创建出来，但此时还未进行词法绑定，是不能被访问的，会抛出错误。**从在作用域创建变量开始，到变量开始可被访问之间的一段时间，称之为 TDZ(暂时性死区)**

### 2.const 声明的变量是绝对的不可变吗？

实际上，不是 const 变量的值不得改动，而是变量指向的那个内存地址不得改动。对于基础类型数据，值保存在变量指向的那个内存地址，等同于常量

对于复合类型数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const 只能保证这个指针是不变的，至于它指向的数据结构是否变化，是不可控的。

例如 const 定义一个对象，对象的属性的值是可变的。
