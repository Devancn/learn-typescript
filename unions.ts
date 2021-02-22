/**
 * 交叉类型（Intersection Type）
 * 交叉类型是将多个类型合并为一个类型。可以把现有的多种类型叠加到一起成为一种类型，包含了所有类型的特性，如：
 * Person & Serializable & Loggable 同时是 Person 和 Serializable 和Loggable。就是说这个类型的对象同时拥有这三种类型的成员。 
 */
{
  function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
      (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
      if (!result.hasOwnProperty(id)) {
        (<any>result)[id] = (<any>second)[id];
      }
    }
    return result;
  }

  class Person {
    constructor(public name: string) { }
  }

  interface Loggable {
    log(): void
  }

  class ConsoleLogger implements Loggable {
    log() { }
  }

  let jim = extend<Person, ConsoleLogger>(new Person("Jim"), new ConsoleLogger);
  let n = jim.name;
  jim.log();

  /**
   * 联合类型（Union Types）
   * 联合类型与交叉类型很有关联，但是使用上却完全不同，一个代码库希望传入 number 或 string 类型的参数。
   */

  function padLeft(value: string, padding: any) {
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
      return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`)
  }

  padLeft("Hello world", 4)

  /**
   * 上面代码存在一个问题，padding 参数的类型指定成了 any, 也就是说可以传入一个既不是 number 也不是 string 类型的参数，但是TypeScript却不报错，但是运行时报错
   */
}

{
  /**
 * 代替 any，可以使用 联合类型 作为 padding的参数
 */
  function padLeft2(value: string, padding: string | number) { }
  // 这样在非运行时就能检查到错误了
  let indentedString = padLeft2("Hello World", true)
}

{
  /**
   * 联合类型表示一个值可以是集中类型之一。我们用竖线（|）分隔每个类型， 所以 number | string | boolean 表示值可以是 number，string，或 boolean
   */
  // 如果一个值是联合类型，只能访问此联合类型的所有类型里共有的成员。
  interface Bird {
    fly();
    layEggs();
  }

  interface Fish {
    swim();
    layEggs()
  }

  function getSmallPet(): Fish | Bird {
    // ...
  }

  let pet = getSmallPet();
  pet.layEggs(); // okay
  pet.swim(); // errors

  /**
   * 这里的联合类型可能有点复杂，但是很容易就习惯了。如果一个值是类型A | B，我们能够 确定的是它包含了 A 和 B 中共有的成员。这个例子里， 我们不能确定一个 Bird | Fish 的联合类型变量是否有 fly 方法，如果变量在运行时是 Fish 类型，那么调用 pet.fly()就出错了。
   */
}

{
  /**
   * 类型保护与区分类型（Type Guards and Differentiating Types）
   * 联合类型适合于那些值可以为不同类型的情况。但想确切地了解是否为 Fish 时怎么办？ JavaScript 里常用来区分2个可能值得方法是检查成员是否存在。如之前提及的，只能访问联合类型中共同拥有的成员
   */

  {
    let pet = getSmallPet();
    //  每一个成员访问都会报错
    if (pet.swim) {
      pet.swim()
    } else if (pet.fly) {
      pet.fly()
    }
  }
  //  为了让这段代码工作，要使用类型断言：
  {
    interface Bird {
      fly();
      layEggs();
    }

    interface Fish {
      swim();
      layEggs()
    }

    let pet = getSmallPet();
    if ((<Fish>pet).swim) {
      (<Fish>pet).swim()
    } else {
      (<Bird>pet).fly();
    }
  }
}

{
  /**
   * 用户自定义的类型保护
   * 这里可以注意到我们不得不多次使用类型断言。假若我们一旦检查过类型，就能在之后的每个分支里清楚地知道 pet 的类型就好了
   */

  /**
   * TypeScript 里的 类型保护 机制让它成为了显示。类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词：
   * 
   */
  interface Bird {
    fly();
    layEggs();
  }

  interface Fish {
    swim();
    layEggs()
  }

  // 在这个例子里，pet is Fish 就是类型谓词。谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数里面的一个参数名
  // 每当使用一些变量调用 isFish时， TypeScript会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型时兼容的
  function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
  }
  let pet = getSmallPet();
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

{
  /**
 * typeof 类型保护
 * 现在看看怎么使用联合类型书写 padLeft 代码。可以像下面这样利用类型断言来写：
 */
  function isNumber(x: any): x is number {
    return typeof x === 'number'
  }

  function isString(x: any): x is string {
    return typeof x === 'string'
  }

  function padLeft3(value: string, padding: string | number) {
    if (isNumber(padding)) {
      return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
      return padding + value;
    }
    throw new Error(`Expected string of number, got '${padding}'.`)
  }
}
{
  /**
   * 然而，必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。幸运的是，现在不必将 typeof x === "number"抽象成一个函数，因为 TypeScript可以将它识别为了一个类型保护。也就是可以直接在代码里面检查类型了。
   */

  function padLeft4(value: string, padding: string | number) {
    /**
     * 这些 typeof 类型保护 只有两种形式能被识别： typeof v === "typename" 和 typeof v !== "typename",
     * "typename"必须是 "number","string","boolean"或"symbol"。但是TypeScript并不会阻止与其它字符串比较，语言不会把那些表达式识别为类型保护。
     */
    if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
      return padding + value
    }
    throw new Error(`Expected string of number, got '${padding}'.`)
  }
}