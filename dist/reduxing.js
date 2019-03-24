"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildActionCreator=buildActionCreator,exports.buildActionCreators=buildActionCreators,exports.buildReducer=buildReducer,exports.byActionType=buildReducerAndActionCreators,exports.byPosition=buildReducerAndActionCreatorsByPosition,exports.default=void 0;function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function _objectSpread(a){for(var b=1;b<arguments.length;b++){var c=null==arguments[b]?{}:arguments[b],d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){_defineProperty(a,b,c[b])})}return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function buildActionCreator(a){return function(b){var c=b.payload,d=b.error,e=b.meta;return{type:a,payload:c,error:d,meta:e}}}function buildActionCreators(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:[];return a.reduce(function(a,b){return a[b]=buildActionCreator(b),a},{})}function buildReducer(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};return function(b,c){return b&&c&&c.type&&a&&a[c.type]?a[c.type](b,c):b||{}}}function buildReducerAndActionCreators(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};return _objectSpread({reducer:buildReducer(a)},buildActionCreators(Object.keys(a)))}function defaultReducerAlias(){// https://gist.github.com/gordonbrander/2230317
return Math.random().toString(36).substr(2,9)}function buildReducerAndActionCreatorsByPosition(){function a(a){return"".concat(c,"-").concat(a)}var b=0<arguments.length&&arguments[0]!==void 0?arguments[0]:[],c=1<arguments.length?arguments[1]:void 0;c||(c=defaultReducerAlias());var d=b.map(function(b,c){return buildActionCreator(a(c))}),e=b.reduce(function(b,c,d){return b[a(d)]=c,b},{});return[].concat(_toConsumableArray(d),[buildReducer(e)])}var _default=buildReducerAndActionCreators;exports.default=_default;
//# sourceMappingURL=reduxing.js.map