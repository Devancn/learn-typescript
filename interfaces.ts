/**
 * 介绍
 * TypeScript的核心原则之一是对值所具有的 结构 进行类型检查。它有时被称为“鸭式变形法”或“结构性子类型化”。在TypeScript里，接口的作用就是为了这些类型命名和为代码或第三方代码定义契约。
 */
{
  /**
   * LabelledValue 接口就好比一个名字，用来秒速上面例子里的要求。它代表了有一个 label 属性且类型为 string 的对象。需要注意的是，这里并不能像其它语言里一样，传给 printLabel 的对象实现了这个接口。我们只会去关注值得外形。
   */
  interface LabeledValue {
    label: string
  }

  function printLabel(labelled: LabeledValue) {
    console.log(labelled.label);
  }

  let myObj = { size: 10, label: 'Size 10 Object' };
  printLabel(myObj)
}

{
  // 只读属性
  let a: number[] = [1, 2, 3, 4];
  let ro: ReadonlyArray<number> = a;
  // ro[0] = 12; // error
  a = [] // error
}

{
  // 额外的属性检查
  /**
   * 在第一个例子里使用了接口， TypeScript让我们传入{size: number; label: string} 到仅期望得到 {label: string} 的函数里。
   */

  interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any
  }

}

{
  /**
   * 函数类型
   * 接口能够描述JavaScript中对象拥有的各种各样的外形。除了描述带有属性的普通对象外，接口也可以描述函数类型。
   * 
   * 为了使用接口表示函数类型，我们需要给接口顶一个调用签名。它就像是一个只有参数列表和返回值的函数定义。
   */
  {
    // 参数列表里的每个参数都需要名字和类型
    interface SearchFun {
      (source: string, subString: string): boolean
    }
    {
      // 这定义后，可以像使用其它接口一样使用这个函数类型的接口。
      let mySearch: SearchFun
      mySearch = function (source: string, subString: string): boolean {
        let result = source.search(subString);
        return result > -1;
      }
    }
    {
      // 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。比如，我们使用下面的代码重写上面的例子：
      let mySearch: SearchFun;
      mySearch = function (src: string, sub: string): boolean {
        let result = src.search(sub);
        return result > -1;
      }
    }
  }
}
{
  /**
   * 可索引的类型
   * 与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如 a[10] 或 ageMap["daniel"]。可索引类型具有一个 索引签名。 它描述了对象索引的类型，还有相应的索引返回值类型
   */
  interface StringArray {
    [index: number]: string
  }

  let myArray: StringArray;
  myArray = ["Bob", "Fred"];

  let myStr: string = myArray[0];

  class Animal {
    name: string
  }

  class Dog extends Animal {
    breed: string
  }

  interface Okay {
    [x: number]: Dog; // ok
    [x: string]: Animal //ok
  }

  /**
   * TypeScript支持两种索引签名：字符串和数字。可以同时使用这两种类型的索引，但是数字索引的返回值必须是字符串索引返回值的子类型。这是因为当使用 number 来索引时，JavaScript会将它转换成 string 然后再去索引对象，也就是 数字 100 去索引等同于使用 字符串 "100" 去索引，因此两者需要保持一致
   */
  interface NotOkay {
    [x: number]: Animal; // not ok
    [x: string]: Dog
  }


  interface NumberDictionary {
    [index: string]: number;
    length: number;
    name: number; // 错误， name 的类型与 索引类型返回值得类型不匹配
  }

  interface ReadonlyStringArray {
    // 可以将索引签名设置为只读，这样就放置了给索引赋值
    readonly [index: number]: string;
  }
  let myArray: ReadonlyStringArray = ["Alice", "Bob"];
  myArray[2] = "Mallory" // error
}

{
  /**
   * 类类型
   */
  interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): number;
  }

  // 与C#或Java里接口的作用一样， TypeScript也能够用它来明确的强制一个类去复核某种锲约
  class Clock implements ClockInterface {
    currentTime: Date;
    constructor(h: number, m: number) { }
    setTime(d: Date): number { return 1 }
  }
}

{
  /**
   * 类静态部分与实例部分的区别
   * 当你操作类和接口的时候，你需要知道类是具有两个类型的：静态部分的类型和实例的类型。当你用构造
   * 签名去定义一个接口并试图顶一个类去实现这个接口会得到一个错误：
   */
  interface ClockConstructor {
    new(hour: number, minute: number);
  }

  // 这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。constructor存在于类的静态部分，所以不在检查的范围内
  class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
  }
}

{
  /**
   * 因此，应该直接操作类的静态部分。
   */

  interface ClockInterface {
    tick();
  }

  interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface
  }

  /**
   * 这里的ClockConstructor描述的是 ctor这个类的构造函数的类型
   */
  function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute)
  }


  class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
      console.log("beep beep");
    }
  }

  class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
      console.log("tick tock");
    }
  }

  let digital = createClock(DigitalClock, 12, 17);
  let analog = createClock(AnalogClock, 7, 32);
}

{
  /**
   * 继承接口
   * 和类一样，接口也可以相互继承。这让我们能够从一个接口里赋值成员到另一个接口里，可以更灵活地
   * 将接口分割到可重用的模块里。
   */
  interface Shape {
    color: string
  }

  interface Square extends Shape {
    slideLength: number
  }

  // let square = <Square>{};
  // 或
  let square = {} as Square;
  square.color = "blue";
  square.slideLength = 10
}
{
  // 一个接口可以继承多个及饿哦库，创建出多个接口的合成接口
  interface Shape {
    color: string
  }

  interface PenStroke {
    penWidth: number
  }

  interface Square extends Shape, PenStroke {
    sideLength: number
  }

  let square = <Square>{};
  square.color = "blue";
  square.sideLength = 10;
  square.penWidth = 5.0
}

{
  /**
   * 混合类型
   * 接口能够描述JavaScript里丰富的类型。因为JavaScript其动态灵活的特点
   * 有时会希望一个对象可以同时具有上面提到的多中类型。
   */

  //  一个对象可以同时作为函数和对象使用，并带有额外的属性
  interface Counter {
    (start: number): string;
    interval: number
    reset(): void;
  }

  function getCounter(): Counter {
    // let counter = function (start: number) { } as Counter;
    // 或
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter
  }

  let c = getCounter();
  c(10);
  c.reset();
  c.interval = 10;
}

{
  /**
   * 接口继承类
   * 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。就好像接口声明了所有类中的存在的
   * 成员，但并没有提供具体实现以西洋。接口同样会继承到类的private和protected成员。这意味着当你
   * 创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现
   */

  class Control {
    private state: any;
  }

  interface SelectableControl extends Control {
    select(): void
  }

  class Button extends Control implements SelectableControl {
    select() { }
  }

  class TextBox extends Control {
    select() {}
  }

  
}

