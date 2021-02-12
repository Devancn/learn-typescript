export { }
/**
 * 接口：
 * 1. 接口一方面在面向对象编程中表示为 行为的抽象， 另外可以用来描述 对象的形状
 * 2. 接口就是把一些类中共有的属性和方法抽象出来，可以用来约束实现此接口的类
 * 3. 一个类可以继承另一个类并实现多个接口
 * 4. 接口像插件一样时用来增强类的，而抽象类时具体类的抽象概念
 * 5. 一个类可以实现多个接口，一个接口也可以被多个类实现，但一个类的可以有多个子类，但只能有一个父类
 */

interface Speakable {
  name: string;
  speak(): void
}

//  描述对象的形状
let speakMan: Speakable = {
  name: 'devan',
  speak() { }
}

//  行为的抽象(同名的接口可以写多个，类型会自动合并)
interface Speakable {
  speak(): void
}

interface Eatable {
  eat: void
}

class Person implements Speakable, Eatable {
  name: string
  speak() {
    throw new Error("Method not implemented.")
  }
  eat: void

}


interface Person2 {
  readonly id: number
  name: string,
  // 任意属性
  [key: string]: any
}

let p: Person2 = {
  id: 1,
  name: 'devan',
  age: 27,
}

// 接口的继承
interface Speakable2 {
  speak(): void
}

interface SpeakChinese extends Speakable2 {
  speakChinese(): void
}

class ChineseMan implements SpeakChinese {
  speakChinese(): void {
    throw new Error("Method not implemented.")
  }
  speak() {
    throw new Error("Method not implemented.")
  }

}

interface Person3 {
  readonly id: number;
}

let p3: Person3 = {
  id: 1
}
// Cannot assign to 'id' because it is a read-only property
// p3.id = 123;

// 函数类型接口
interface Discount {
  (price: number): number
}

const discount: Discount = (price: number): number => {
  return price * 0.8;
}
// 可索引接口
// 可对数组和对象进行约束

interface User {
  [index: number]: string
}

let user: User = {
  0: '0'
}

let arr: User = ['1', '2', '3'];
// 如何用接口约束类
interface Speakable {
  speak(): void
}

// 构造函数类型
class Animal {
  constructor(public name: string) {

  }
}

// 如果修饰普通函数不用带 new 
// 带 new 表示修饰构造函数
interface WithNameClass {
  // 带new表示描述类，非普通函数  
  new(name: string): Animal
}

function createAnimal(clazz: WithNameClass, name: string) {
  return new clazz(name);
}

let a = createAnimal(Animal, 'dog');
console.log(a.name);

/**
 * 重要知识点：
 * 当我们写一个类的时候，会得到2个类型
 * 1. 构造函数类型的函数类型
 * 2. 类的实例类型
 */

namespace b {
  class Component {
    static myName: string = '静态名称属性';
    myName: string = '实例名称属性'
  }

  // Component类名本身表示的是实例的类型
  let c: Component = { myName: 'Devan' }
  let d: Component = new Component();
  class Com {
    static myName: string = '静态名称属性';
    myName: string = '实例名称属性'
  }
  // 这里的typeof 非js中的typeof，这里的typeof是ts中获取某个标识符的对应的类型
  let f: typeof Component = Com;
  let f1: typeof Component = Component;

  let f2 = {
    name: 'devan'
  }
  let f3: typeof f2 = {
    name: '123'
  }
}


namespace c {
  function Component() {
    this.myName = '实列名称属性'
  }

  Component.myName = '静态名称属性'
}

interface Type1 {
  // 描述一个函数
  (name: string): any
  // 这里的age表示 描述上面这个函数的一个属性
  age: number
}

interface Type2 {
  // 描述一个对象的方法
  a: (name: string) => any
}

let t: any = (name: string) => {}
t.age = 'sdf'
let t1: Type1 = t
let t2: Type2 = {
  a: (a: string) => 123
}