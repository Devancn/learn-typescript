/**
 * 枚举
 * 使用枚举可以定义一些带名字的常量。使用枚举可以清晰地表达意图或创建一组有区别的用例。TypeScript支持数字和基于字符串的枚举
 */

/**
 * 数字枚举
 * Up 使用初始化为1。其余的成员从 1 开始自动增。
 * 也可以不适用初始化器， Up 的默认值为0，其余成员从 0  开始自增 
 */
{
  enum Direction {
    Up = 1,
    Down,
    Left,
    Right
  }
}

{
  // 使用枚举
  enum Response {
    No = 0,
    Yes = 1,
  }

  function respond(recipient: string, message: Response): void {
  }
  respond("Princess Caroline", Response.No);
}

{
  // 字符串枚举
  enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
  }
}

/**
 * 计算的和常量成员
 * 每个枚举成员都带有一个值，它可以事 常量 或 计算出来的。
 * 当满足如下条件时，枚举成员被当做是常量
 */
{
  // 枚举的第一个成员没有初始化器，这种情况下它被赋予值 0
  enum E {
    X
  }
  // 枚举成员不带初始化器且之前的枚举成员是一个 数字常量，当前的枚举成员的值为它上一个枚举成员值加1.

  enum E1 { X, Y, Z }
  enum E2 {
    A = 1,
    B,
    C
  }
  /**
   * 枚举成员使用 常量枚举表达式初始化。常数枚举表达式是TypeScript表达式的子集，它可以在编译阶段求值。
   * 当一个表达式满足下面添加之一时，它就是一个常量枚举表达式：
   * 1. 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
   * 2. 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
   * 3. 带括号的常量枚举表达式
   * 4. 一元运算符 +， -， ~其中之一应用在了常量枚举表达式
   */
}

{
  enum Enum {
    A
  }

  // console.log(Enum.A);
  // console.log(Enum[0]);
}

{

  const enum Enum {
    A = 1,
    B = A * A
  }
  // console.log(Enum.A, 'Enum.A')
  // console.log(Enum[1], 'Enum.A')
}

{
  const enum Enum {
    A,
    B
  }

  console.log(Enum.A)
  console.log(Enum[0])
}

window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button);
}

class Animal {
  feet: number;
  constructor(name: string, numFeet: number) { }
}

class Size {
  feet: number;
  constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  // OK

