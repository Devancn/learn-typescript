/**
  * 现在把 Validation 命名空间分割成多个文件。尽管是不同的文件，它们仍是同一个命名空间，
  * 并且在使用的时候如同它们在一个文件中定义的一样。因为不同的文件之间存在依赖关系，所以加入了
  * 引用标签来告诉编译器之间的关联
  */

namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}