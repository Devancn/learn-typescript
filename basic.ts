let married: boolean = false;
let age: number = 10;
let first_name: string = 'devan';
let array: number[] = [1, 2, 3];
let array2: Array<number> = [4, 5, 6];

// 元素类型tuple 数量和类型已知的数组
let user: [string, number] = ['devan', 27];

// 枚举类型
enum Gender {
  GIRL,
  BOY
}

console.log(Gender.BOY, Gender[1])
console.log(Gender.GIRL, Gender[0])

// 常量枚举
const enum Colors {
  RED,
  YELLOW,
  BLUE
}

let myColor = [Colors.RED, Colors.YELLOW, Colors.BLUE]

// 任意类型 any

// 如果变量定义为any类型，就跟普通js一样，不进行类检查
{
  let root: any = document.getElementById('root');
  root.style.color = 'red'
}
{
  let element: (HTMLElement | null) = document.getElementById('root');
  // ! 非空断言
  element!.style.color = 'green';
}

{
  // null undefined 是其它类型的子类型
  // 如果strictNullChecks的值为true,则不能把null,undefined赋值给其它类型
  let x: number;
  x = 1;
  x = undefined

  let y: number | null | undefined;
  y = 2;
  y = undefined;
  y = null;
}

{
  /**
   *  never 代表不会出现的值
   * 1. 函数永远没有返回值
   */
  function error(message: string): never {
    throw new Error('报错');
    console.log('ok')
  }

  function loop(): never {
    while (true) {

    }
    console.log('ok')
  }
}

{
  function fn(x: number | string) {
    if (typeof x === 'number') {
      console.log(x)
    } else if (typeof x === 'string') {
      console.log(x)
    } else {
      console.log(x) // never
    }
  }
}

{
  // void 与 never
  // void 代表没有任何类型
  // 如果一个函数没有返回值则是void类型
  // 如果函数返回never类型，则函数无法正常执行
  function greeting(): void {
    return undefined
  }
}

{
  // Symbol
  const s1 = Symbol('key');
  const s2 = Symbol('ke');
  // console.log(s1 === s2)
}

{
  // 类型推导
  let uname;
  uname = 1;
  uname = 'devan'

  let uname2 = 'huan'
  uname2 = 2;
}

{
  // 包装对象 wrapper object
  // 原型类型 对象类型
  let name = 'devan';
  // 内部自动包装成对象类型
  console.log(name.toUpperCase())
}

{
  // 联合类型
  let name: string | number;
  console.log(name.toString())
  name = 2;
  console.log(name.toFixed(2));
}

{
  // 类型断言
  let name: string | number;
  console.log((name! as number).toFixed());
  console.log((name! as string).length);
  // 双重断言
  console.log((name! as any as boolean));
}


{
  // 字面量类型
  const up: 'Up' = 'Up';
  const down: 'down' = 'down';
  const right: 1 = 1

  type Direction = 'Up' | 'Down'
  // 可实现枚举的效果
  function move(direction: Direction) { }
  move('Down')
}
{
  // 类型字面量
  type Person = {
    name: string,
    age: number
  }

  let p1: Person = {
    name: 'devan',
    age: 27
  }
}

{
  // 字符串字面量和联合类型
  type T1 = '1' | '2' | '3'
  type T2 = string | number | boolean
  let t1: T1 = '3'
  let t2: T2 = true
}

{
  function hello(name: string): void {
    console.log('hello', name);
  }
  hello('zhufeng')

  type GetName = (firstName: string, lastName: string) => string;
  let getName: GetName = function (firstName: string, lastName: string): string {
    return firstName + lastName;
  }
}

{
  function print(name: string, age?: number): void {
    console.log(name, age);
  }
  print('devan', 27)

  function sum(...numbers: number[]) {
    return numbers.reduce((val, item) => val + item, 0)
  }
  console.log(sum(1, 2, 3));
}


{
  // 函数的重载
  let obj: any = {};

  function attr(val: string): void
  function attr(val: number): void
  function attr(val: any): void {
    if (typeof val === 'string') {
      obj.name = val
    } else if (typeof val === 'number') {
      obj.age = val
    }
  }

  attr('devan')
  attr(27)
  // attr(true)

  function add(a: string, b:string): void
  function add(a: number, b:number): void
  function add(a: string|number, b:string|number): void {

  }
  add('a', 'b')
  add(1, 1)
}
