namespace c {
  /**
   * 
   * @param constructor 装饰的类名
   */
  function replaceClass(constructor: Function) {
    console.log(arguments, 'replaceClass');
    return class {
      name: string;
      eat: Function;
      age: number;
      constructor() { }
    }
  }
  // 类装饰器
  @replaceClass
  class Person {
    name: string;
    eat: Function;
    constructor() { }
  }

  let p: Person = new Person();
  console.log(p.name)

}

// 属性装饰器 
namespace d {
  // 如果装饰的是实例属性，则target为构造函数的原型
  function upperCase(target: any, propertyKey) {
    console.log(arguments, 'upperCase')
    let value = target[propertyKey];
    const getter = () => value;
    const setter = (newVal: string) => { value = newVal.toUpperCase() }
    if (delete target[propertyKey]) {
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      })
    }
  }

  // 如果装饰的是静态属性，则target构造函数本身
  function staticPropertyDecorator(target: any, propertyKey: string) {
    console.log(arguments, 'arguments', 'staticPropertyDecorator');
    console.log(target, propertyKey);
  }
  function noEnumerable(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target)
    console.log(arguments, 'arguments', 'noEnumerable')
    descriptor.enumerable = false
  }
  class Person {
    @upperCase
    name: string = 'Devan';
    @staticPropertyDecorator
    public static age: number = 10;
    constructor() { }
    @noEnumerable
    getName() { console.log(this.name) }
    sum(...args: any) {
      return args.reduce((acc: number, item: number) => acc + item, 0)
    }
  }

  let p = new Person;
  console.log(p.name)
}
/*
  总结：
  1. 如果装饰器装饰的是类名,则装饰器函数target为类
  2. 如果装饰器装饰的是类的属性名时，target为类的原型对象，第二个参数为属性名字符串
  3. 如果装饰器装饰的类的静态属性时，target为类，第二个参数为属性名字符串
  4. 如果装饰器装饰的时类的方法时，target为类，第二个参数为属性字符串，第三个参数为该属性的属性描述对象
*/

// 参数装饰器
namespace e {
  /**
   * 
   * @param target 如果修饰的时静态成员则为构造函数，非静态成员就是构造函数原型
   * @param methodName 方法名称
   * @param paramIndex 参数索引
   */
  function addAge(target: any, methodName, paramIndex: number) {
    console.log(arguments, 'params')
    target.age = 27;
  }

  class Person {
    age: number
    login(username: string, @addAge password: string) {
      console.log(this.age, username, password);
    }
  }

  let p = new Person();
  p.login('devan', '123');
}

// 装饰器的执行顺序
namespace f {
  function ClassDescorator1() {
    return function (target) {
      console.log('ClassDescorator1');
    }
  }
  function ClassDescorator2() {
    return function (target) {
      console.log('ClassDescorator2');
    }
  }
  function PropertyDecorator(name: string) {
    return function (target, propertyKey) {
      console.log('PropertyDecorator', propertyKey, name);
    }
  }

  function MethodDecorator() {
    return function (target, propertyName) {
      console.log('MethodDecorator', propertyName);
    }
  }

  function ParameterDecorator() {
    return function(target, methodName, index) {
      console.log('ParameterDecorator', methodName, index);
    }
  }

  @ClassDescorator1()
  @ClassDescorator2()
  class Person {
    @PropertyDecorator('name')
    name: string = '';
    @PropertyDecorator('age')
    age: number = 10;
    @MethodDecorator()
    hello(@ParameterDecorator() p1: string, @ParameterDecorator() p2: string) { }
  }
}
/**
 * 执行顺序规律总结：
 * 1. 类装饰器最后执行，后写的类装饰器先执行(越靠近类的装饰器执行顺序较高)
 * 2. 先执行参数装饰器然后再执行方法装饰器
 * 3. 方法和属性装饰器时谁在前面先执行谁
 * 
 * 先内后外
 */