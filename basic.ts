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
  
  let y:number|null|undefined;
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

  function loop():never {
    while(true) {

    }
    console.log('ok')
  }
}

{
  function fn(x: number|string) {
    if(typeof x === 'number') {
      console.log(x)
    } else if(typeof x === 'string') {
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
  function greeting():void {
    return undefined
  }
}

{
  // Symbol
  const s1 = Symbol('key');
  const s2 = Symbol('ke');
  console.log(s1 === s2)
}