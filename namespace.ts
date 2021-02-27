interface StringValidator {
  isAcceptable(s: string): boolean
}

let lettersRegexp = /^[A-Za-z]/;

let numberRegexp = /^[0-9]+$/;

// class LettersOnlyValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return lettersRegexp.test(s);
//   }
// }

// class ZipCodeValidator implements StringValidator {
//   isAcceptable(s: string) {
//     return s.length === 5 && numberRegexp.test(s);
//   }
// }

let strings = ["Hello", "98052", "101"];

let validators: { [s: string]: StringValidator } = {};

// validators["ZIP code"] = new ZipCodeValidator();
// validators["Letters only"] = new LettersOnlyValidator();

for (let s of strings) {
  for (let name in validators) {
    let isMatch = validators[name].isAcceptable(s);
    console.log(`'${s}' ${isMatch ? "matches" : "does not match"} ${name}`);
  }
}
/**
 * 命名空间
 * 随着更多校验器的加入，需要一种手段来组织代码，以便于在记录他们类型的同时还不用担心与其它对象产生命名冲突。因此
 * 把校验器包裹到一个命名空间内，而不是把他们放在全局命名空间下。
 */

namespace Validation {
  /**
   * 下面把所有与校验器相关的类型都放到一个叫做 Validation的命名空间里，想让这些接口和类在命名空间之外也可访问的。
   * 所以需要export。 相反， 变量 lettersRegexp 和  numberRegexp 是实现的细节，不需要导出，因此它们在命名空间外是不能访问。
   * 命名空间之外访问 LettersOnlyValidator时需要限定类型的名称
   */
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;

  // export class LettersOnlyValidator implements StringValidator {
  //   isAcceptable(s: string) {
  //     return lettersRegexp.test(s);
  //   }
  // }

  // export class ZipCodeValidator implements StringValidator {
  //   isAcceptable(s: string) {
  //     return s.length === 5 && numberRegexp.test(s);
  //   }
  // }
}

/**
 * 分离到多文件
 * 当应用变得越来越大时，需要将代码分离到不同的文件以便于维护。
 */



/**
 * 别名
 * 另一种简化命名空间的操作的方法时使用 import q = x.y.z 给常用的对象起一个简短的名字。不要与用来加载模块的
 * import x = require('name') 语法弄混，这里的语法是为指定的一个符号创建一个别名。可以用这种方法为任意标识符创建别名，也包括
 * 导入的模块中的对象。
 */
namespace Shapes {
  export namespace Polygons {
    export class Triangle { }
    export class Square { }
  }
}

import polygons = Shapes.Polygons;
// 与 new Shapes.Polygons.Square() 一样
let sq = new polygons.Square();
