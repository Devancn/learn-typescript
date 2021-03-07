/// <amd-module name="NamedModule"/>
export class C {}
/**
 * 这会将 NamedModule 传入到AMD define 函数：
 * 
 * define("NamedModule", ["require", "exports"], function (require, exports) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    exports.C = C;
});
 */
