export { }

/**
 * 这里的 T 可以简单理解为一个形参，表示一个类型的标量，
 * 在调用 createArray方法时必须把对应传入一个实参，表示一个实际类型
 */
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

let result = createArray<string>(3, 'x');

console.log(result)

// 泛型类
class MyArray<T> {
  private list: T[] = [];
  add(value: T) {
    this.list.push(value);
  }

  getMax(): T {
    return this.list[0];
  }
}

let array = new MyArray<number>();
array.add(1);
array.add(2);
array.add(3);
console.log(array.getMax());

// 泛型与new
/**
 * 
 * new() 表示 type是一个类， 该类的实例化时返回一个T 类型
 */
function factory<T>(type: { new(): T }): T {
  return new type();
}

class Person {

}

let p = factory<Person>(Person)
console.log(p);

// 泛型接口

namespace a {
  interface Calculate {
    <T>(a: T, b: T): T
  }

  let sum: Calculate = function <T>(a: T, b: T): T {
    // 这里不能使用 加好 ，因为泛型 T 可以表示任意类型，
    //  而 + 对 a和b的类型时有限制的
    return a + b;
  }

  sum<number>(1, 2);
}

namespace b {
  interface Calculate<T> {
    (a: T, b: T): T
  }

  let sum: Calculate<number> = function (a: number, b: number): number {
    return a + b;
  }
  sum(1, 2)
}
namespace c {
  interface Calculate<T> {
    <U>(a: T, b: T): U
  }

  let sum: Calculate<number> = function <U>(a: number, b: number): U {
    return a as any;
  }
  sum<number>(1, 2)
}

// 泛型可以写多个

function swap<A, B>(tuple: [A, B]) {
  return [tuple[1], tuple[0]];
}

namespace d {
  // 默认泛型
  function createArray<T = number>(length: number, value: T): Array<T> {
    let result: T[] = [];
    return result;
  }

  let result = createArray(4, 'x');
  console.log(result, 'result');

  // 第一种方式
  interface T2<T> {

  }
  type T22 = T2<number>
  // 第二种方式
  interface T24<T = number> {

  }
  type T241 = T24
}

// 泛型约束
function logger<T>(val: T) {
  console.log(val.length);
}

interface LengthWise {
  length: number
}

function logger2<T extends LengthWise>(value: T) {
  console.log(value.length);
}

logger2<string>('a')

let obj = {
  length: 10
}

type Obj = typeof obj
logger2<Obj>('a')

