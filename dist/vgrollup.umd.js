// @vegas-VGRollup v1.1.0
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).window=t.window||{})}(this,(function(t){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function r(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||i(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function a(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=i(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,l=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){l=!0,a=t},f:function(){try{s||null==n.return||n.return()}finally{if(l)throw a}}}}var s=function(){function t(e,n,r){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.target=e||void 0,this.classes={hidden:"vg-rollup-content--hidden",fade:"vg-rollup-content--fade",ellipsis:"vg-rollup-content--ellipsis",button:"vg-rollup-content--button",transition:"vg-rollup-content--transition"},this.settings=l({content:"text",fade:!0,transition:!1,ellipsis:{line:null},button:!0,buttonText:{more:"More",less:"Less"}},n),this.target){var i=document.getElementById(this.target);this.init(i);var o=document.querySelector('[data-rollup-toggle="'+this.target+'"]');o&&this.toggle(o,r)}else console.error("Initialization failed")}var e,i,o;return e=t,i=[{key:"init",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this,r=t.clientHeight,i=parseInt(t.dataset.height)||r/2,o="false"!==t.dataset.fade&&n.settings.fade,s="true"===t.dataset.transition||n.settings.transition,l=t.dataset.line||null!==n.settings.ellipsis.line,u="false"!==t.dataset.button&&n.settings.button;if(e||n.switch(t),r>i&&"text"===n.settings.content)t.classList.add(n.classes.hidden),t.style.height=i+"px",h(),m(),v(),A();else if("elements"===n.settings.content){var c,f=t.dataset.elements||"item",d=t.querySelectorAll("."+f),y=Number(t.dataset.cnt)||5,p=1,b=a(d);try{for(b.s();!(c=b.n()).done;){var g=c.value;p>y&&g.classList.add("d-none"),p++}}catch(t){b.e(t)}finally{b.f()}u=p-1>y,h(),m(),v(),A()}function h(){if(l){var e=t.dataset.line||n.settings.ellipsis.line;o=!1,e?(t.classList.add(n.classes.ellipsis),t.style.webkitLineClamp=e):console.log("The [data-line] or param[line] variable should not be empty")}}function m(){s&&t.classList.add(n.classes.transition)}function v(){o&&t.classList.add(n.classes.fade)}function A(){if(e&&(t.setAttribute("id",n.target),u)){var r=t.dataset.buttonMore||n.settings.buttonText.more;t.insertAdjacentHTML("afterend",'<div  class="'+n.classes.button+'"><a href="#" aria-expanded="false" data-rollup-toggle="'+n.target+'">'+r+"</a></div>")}}}},{key:"switch",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this;if(e)this.init(t,!1);else if(t.classList.remove(this.classes.hidden),t.classList.remove(this.classes.ellipsis),t.classList.remove(this.classes.fade),t.removeAttribute("style"),"elements"===n.settings.content){var i=t.dataset.elements,o=r(t.querySelectorAll("."+i));o.length&&o.forEach((function(t){return t.classList.remove("d-none")}))}}},{key:"toggle",value:function(t,e){var n=this;t.onclick=function(t){var e=t.target,r=e.dataset.rollupToggle,i=e.getAttribute("aria-expanded"),o=document.getElementById(r);return"false"===i?(e.setAttribute("aria-expanded",!0),e.text=o.dataset.buttonLess||n.settings.buttonText.less,n.switch(o,!1)):(e.setAttribute("aria-expanded",!1),e.text=o.dataset.buttonMore||n.settings.buttonText.more,n.switch(o,!0)),!1}}}],i&&n(e.prototype,i),o&&n(e,o),Object.defineProperty(e,"prototype",{writable:!1}),t}();function l(){for(var t=function(t){return t&&"object"===e(t)},n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return i.reduce((function(e,n){return Object.keys(n).forEach((function(i){var o=e[i],a=n[i];Array.isArray(o)&&Array.isArray(a)?e[i]=o.concat.apply(o,r(a)):t(o)&&t(a)?e[i]=l(o,a):e[i]=a})),e}),{})}t.VGRollup=s}));
