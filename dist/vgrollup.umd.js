// @vegas-VGRollup v1.0.3
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).window=t.window||{})}(this,(function(t){"use strict";function e(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var s=function(){function t(e,s,i){if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.target=e||void 0,this.classes={hidden:"vg-rollup-content--hidden",fade:"vg-rollup-content--fade",ellipsis:"vg-rollup-content--ellipsis",button:"vg-rollup-content--button",transition:"vg-rollup-content--transition"},this.settings=Object.assign({fade:!0,transition:!1,ellipsis:{line:null},button:!0,buttonText:{more:"More",less:"Less"}},s),this.target){var n=document.getElementById(this.target);this.init(n);var a=document.querySelector('[data-rollup-toggle="'+this.target+'"]');a&&this.toggle(a,i)}else console.error("Initialization failed")}var s,i,n;return s=t,i=[{key:"init",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],s=t.clientHeight,i=parseInt(t.dataset.height)||s/2,n="false"!==t.dataset.fade&&this.settings.fade,a="true"===t.dataset.transition||this.settings.transition,l=t.dataset.line||null!==this.settings.ellipsis.line,o="false"!==t.dataset.button&&this.settings.button;if(e||this.switch(t),s>i){if(t.classList.add(this.classes.hidden),t.style.height=i+"px",l){var r=t.dataset.line||this.settings.ellipsis.line;n=!1,r?(t.classList.add(this.classes.ellipsis),t.style.webkitLineClamp=r):console.log("The [data-line] or param[line] variable should not be empty")}if(a&&t.classList.add(this.classes.transition),n&&t.classList.add(this.classes.fade),e&&(t.setAttribute("id",this.target),o)){var d=t.dataset.buttonMore||this.settings.buttonText.more;t.insertAdjacentHTML("afterend",'<div  class="'+this.classes.button+'"><a href="#" aria-expanded="false" data-rollup-toggle="'+this.target+'">'+d+"</a></div>")}}}},{key:"switch",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e?this.init(t,!1):(t.classList.remove(this.classes.hidden),t.classList.remove(this.classes.ellipsis),t.classList.remove(this.classes.fade),t.removeAttribute("style"))}},{key:"toggle",value:function(t,e){var s=this;t.onclick=function(t){var e=t.target,i=e.dataset.rollupToggle,n=e.getAttribute("aria-expanded"),a=document.getElementById(i);return"false"===n?(e.setAttribute("aria-expanded",!0),e.text=a.dataset.buttonLess||s.settings.buttonText.less,s.switch(a,!1)):(e.setAttribute("aria-expanded",!1),e.text=a.dataset.buttonMore||s.settings.buttonText.more,s.switch(a,!0)),!1}}}],i&&e(s.prototype,i),n&&e(s,n),Object.defineProperty(s,"prototype",{writable:!1}),t}();t.VGRollup=s}));