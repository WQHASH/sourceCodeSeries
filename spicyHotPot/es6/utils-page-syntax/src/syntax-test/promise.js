
function lodash(){};

var obj = {"Object": {"sanme":"xxx"}};
var arr = ["yomei"];
export {obj, arr};
export default lodash;

/*********/
export {newObj} from "./module";
//export 默认导出 和 其他接口的可以共存，重点在于理解 export default =>这只是导出一个default的变量而已