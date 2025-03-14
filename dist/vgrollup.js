var vg;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/VGRollup/index.js":
/*!*******************************!*\
  !*** ./src/VGRollup/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VGRollup: () => (/* reexport safe */ _js_VGRollup__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _js_VGRollup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/VGRollup */ "./src/VGRollup/js/VGRollup.js");
/**
 * --------------------------------------------------------------------------
 * Export Public Api
 * Автор: Vegas Studio
 * Лицензия: смотри LICENSE.md
 * --------------------------------------------------------------------------
 */




/***/ }),

/***/ "./src/VGRollup/js/VGRollup.js":
/*!*************************************!*\
  !*** ./src/VGRollup/js/VGRollup.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class VGRollup {
  constructor(target, arg, callback) {
    this.target = target || undefined;
    this.classes = {
      hidden: "vg-rollup-content--hidden",
      fade: "vg-rollup-content--fade",
      ellipsis: "vg-rollup-content--ellipsis",
      button: "vg-rollup-content--button",
      transition: "vg-rollup-content--transition"
    };
    this.total = 0;
    this.count = 0;
    this.offset = 0;
    this.isOffset = false;
    this.settings = mergeDeepObject({
      content: 'text',
      fade: true,
      transition: false,
      offset: 0,
      ellipsis: {
        line: null
      },
      button: true,
      showNum: false,
      showNumText: ' more ',
      buttonText: {
        more: "Show",
        less: "Hide"
      }
    }, arg);
    if (this.target) {
      let $element = document.getElementById(this.target);
      this.init($element);
      if (Number($element.dataset.offset) > 0) {
        this.offset = Number($element.dataset.offset) + Number($element.dataset.cnt) || 0;
        this.settings.offset = Number($element.dataset.offset) || 0;
        this.isOffset = true;
      }
      let $toggle = document.querySelector("[data-rollup-toggle=\"" + this.target + "\"]");
      if ($toggle) this.toggle($toggle, callback);
    } else {
      console.error("Initialization failed");
    }
  }
  init($self, isButtonAppend = true) {
    let _this = this,
      self_height = $self.clientHeight,
      set_height = parseInt($self.dataset.height) || self_height / 2;
    let isFade = $self.dataset.fade !== "false" && _this.settings.fade,
      isTransition = $self.dataset.transition === "true" || _this.settings.transition,
      isEllipsis = $self.dataset.line || _this.settings.ellipsis.line !== null,
      isButton = $self.dataset.button !== "false" && _this.settings.button,
      isShowNum = $self.dataset.showNum === "true" || _this.settings.showNum;
    if (!isButtonAppend) _this.switch($self);
    if (self_height > set_height && _this.settings.content === 'text') {
      $self.classList.add(_this.classes.hidden);
      $self.style.height = set_height + "px";
      ellipsis();
      transition();
      fade();
      button();
    } else if (_this.settings.content === 'elements') {
      let elementClass = $self.dataset.elements || 'item',
        items = $self.querySelectorAll('.' + elementClass),
        cnt = Number($self.dataset.cnt) || 5,
        i = 1;
      _this.total = items.length;
      _this.count = cnt;
      for (const item of items) {
        if (i > cnt) {
          item.classList.add('d-none');
        }
        i++;
      }
      if (isButton === true) isButton = i - 1 > cnt;
      ellipsis();
      transition();
      fade();
      button();
    }
    function ellipsis() {
      if (isEllipsis) {
        let line = $self.dataset.line || _this.settings.ellipsis.line;
        isFade = false;
        if (line) {
          $self.classList.add(_this.classes.ellipsis);
          $self.style.webkitLineClamp = line;
        } else {
          console.log("The [data-line] or param[line] variable should not be empty");
        }
      }
    }
    function transition() {
      if (isTransition) {
        // TODO no work
        $self.classList.add(_this.classes.transition);
      }
    }
    function fade() {
      if (isFade) {
        $self.classList.add(_this.classes.fade);
      }
    }
    function button() {
      if (isButtonAppend) {
        $self.setAttribute("id", _this.target);
        if (isButton) {
          let textShowNum = '';
          if (isShowNum) {
            let sum = _this.total - _this.count;
            if (sum > 0) {
              textShowNum = ($self.dataset.showNumText || _this.settings.showNumText) + sum;
            }
          }
          let btnTextMore = $self.dataset.buttonMore || _this.settings.buttonText.more;
          $self.insertAdjacentHTML("afterend", "<div  class=\"" + _this.classes.button + "\"><a href=\"#\" aria-expanded=\"false\" data-rollup-toggle=\"" + _this.target + "\">" + btnTextMore + textShowNum + "</a></div>");
        }
      }
    }
  }
  switch($self, switcher = false) {
    const _this = this;
    if (switcher) {
      this.init($self, false);
    } else {
      $self.classList.remove(this.classes.hidden);
      $self.classList.remove(this.classes.ellipsis);
      $self.classList.remove(this.classes.fade);
      $self.removeAttribute("style");
      if (_this.settings.content === 'elements') {
        let className = $self.dataset.elements;
        let items = [...$self.querySelectorAll('.' + className)];
        if (items.length) {
          if (_this.offset > 0) {
            let className = $self.dataset.elements,
              items = [...$self.querySelectorAll('.' + className)];
            items.slice(_this.count, _this.offset).forEach(item => item.classList.remove('d-none'));
            _this.offset = _this.offset + _this.settings.offset;
            if (_this.offset > items.length) {
              _this.isOffset = false;
              _this.offset = 0;
            }
          } else {
            items.forEach(item => item.classList.remove('d-none'));
          }
        }
      }
    }
  }
  toggle($toggle, callback) {
    let $_this = this;
    $toggle.onclick = function (e) {
      let $btn = e.target,
        target = $btn.dataset.rollupToggle,
        aria = $btn.getAttribute("aria-expanded");
      let $target = document.getElementById(target);
      if ($_this.offset > 0) {
        if ($_this.isOffset) {
          aria = 'false';
        } else {
          aria = 'true';
        }
      }
      if (aria === "false") {
        $btn.setAttribute("aria-expanded", true);
        $btn.text = $target.dataset.buttonLess || $_this.settings.buttonText.less;
        if ($_this.offset > 0) {
          console.log($_this.isOffset);
          if ($_this.isOffset) {
            $btn.text = $target.dataset.buttonMore || $_this.settings.buttonText.more;
          } else {
            $btn.text = $target.dataset.buttonLess || $_this.settings.buttonText.less;
          }
        }
        $_this.switch($target, false);

        // TODO callback the area is show
      } else {
        let textShowNum = '',
          isShowNum = $target.dataset.showNum === "true" || $_this.settings.showNum;
        if (isShowNum) {
          let sum = $_this.total - $_this.count;
          if (sum > 0) {
            textShowNum = ($target.dataset.showNumText || $_this.settings.showNumText) + sum;
          }
        }
        $btn.setAttribute("aria-expanded", false);
        $btn.text = ($target.dataset.buttonMore || $_this.settings.buttonText.more) + textShowNum;
        $_this.switch($target, true);

        // TODO callback the area is hide
      }
      return false;
    };
  }
}

/**
 * Глубокое объединение объектов
 * @param objects
 * @returns {*}
 */
function mergeDeepObject(...objects) {
  const isObject = obj => obj && typeof obj === "object";
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeepObject(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });
    return prev;
  }, {});
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VGRollup);

/***/ }),

/***/ "./src/VGRollup/scss/vgrollup.scss":
/*!*****************************************!*\
  !*** ./src/VGRollup/scss/vgrollup.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VGRollup: () => (/* reexport safe */ _src_VGRollup__WEBPACK_IMPORTED_MODULE_0__.VGRollup)
/* harmony export */ });
/* harmony import */ var _src_VGRollup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/VGRollup */ "./src/VGRollup/index.js");
/* harmony import */ var _src_VGRollup_scss_vgrollup_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/VGRollup/scss/vgrollup.scss */ "./src/VGRollup/scss/vgrollup.scss");



})();

vg = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmdyb2xsdXAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTs7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUMxUUE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92Zy8uL3NyYy9WR1JvbGx1cC9pbmRleC5qcyIsIndlYnBhY2s6Ly92Zy8uL3NyYy9WR1JvbGx1cC9qcy9WR1JvbGx1cC5qcyIsIndlYnBhY2s6Ly92Zy8uL3NyYy9WR1JvbGx1cC9zY3NzL3Zncm9sbHVwLnNjc3M/M2E3NiIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmcvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92Zy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZnLy4vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEV4cG9ydCBQdWJsaWMgQXBpXHJcbiAqINCQ0LLRgtC+0YA6IFZlZ2FzIFN0dWRpb1xyXG4gKiDQm9C40YbQtdC90LfQuNGPOiDRgdC80L7RgtGA0LggTElDRU5TRS5tZFxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbmltcG9ydCBWR1JvbGx1cCBmcm9tIFwiLi9qcy9WR1JvbGx1cFwiO1xyXG5cclxuZXhwb3J0IHtcclxuXHRWR1JvbGx1cFxyXG59O1xyXG4iLCJjbGFzcyBWR1JvbGx1cCB7XHJcblx0Y29uc3RydWN0b3IodGFyZ2V0LCBhcmcsIGNhbGxiYWNrKSB7XHJcblx0XHR0aGlzLnRhcmdldCA9IHRhcmdldCB8fCB1bmRlZmluZWQ7XHJcblx0XHR0aGlzLmNsYXNzZXMgPSB7XHJcblx0XHRcdGhpZGRlbjogXCJ2Zy1yb2xsdXAtY29udGVudC0taGlkZGVuXCIsXHJcblx0XHRcdGZhZGU6IFwidmctcm9sbHVwLWNvbnRlbnQtLWZhZGVcIixcclxuXHRcdFx0ZWxsaXBzaXM6IFwidmctcm9sbHVwLWNvbnRlbnQtLWVsbGlwc2lzXCIsXHJcblx0XHRcdGJ1dHRvbjogXCJ2Zy1yb2xsdXAtY29udGVudC0tYnV0dG9uXCIsXHJcblx0XHRcdHRyYW5zaXRpb246IFwidmctcm9sbHVwLWNvbnRlbnQtLXRyYW5zaXRpb25cIlxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnRvdGFsICAgID0gMDtcclxuXHRcdHRoaXMuY291bnQgICAgPSAwO1xyXG5cdFx0dGhpcy5vZmZzZXQgICA9IDA7XHJcblx0XHR0aGlzLmlzT2Zmc2V0ID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IG1lcmdlRGVlcE9iamVjdCh7XHJcblx0XHRcdGNvbnRlbnQ6ICd0ZXh0JyxcclxuXHRcdFx0ZmFkZTogdHJ1ZSxcclxuXHRcdFx0dHJhbnNpdGlvbjogZmFsc2UsXHJcblx0XHRcdG9mZnNldDogMCxcclxuXHRcdFx0ZWxsaXBzaXM6IHtcclxuXHRcdFx0XHRsaW5lOiBudWxsXHJcblx0XHRcdH0sXHJcblx0XHRcdGJ1dHRvbjogdHJ1ZSxcclxuXHRcdFx0c2hvd051bTogZmFsc2UsXHJcblx0XHRcdHNob3dOdW1UZXh0OiAnIG1vcmUgJyxcclxuXHRcdFx0YnV0dG9uVGV4dDoge1xyXG5cdFx0XHRcdG1vcmU6IFwiU2hvd1wiLFxyXG5cdFx0XHRcdGxlc3M6IFwiSGlkZVwiXHJcblx0XHRcdH1cclxuXHRcdH0sIGFyZyk7XHJcblxyXG5cdFx0aWYgKHRoaXMudGFyZ2V0KSB7XHJcblx0XHRcdGxldCAkZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudGFyZ2V0KTtcclxuXHRcdFx0dGhpcy5pbml0KCRlbGVtZW50KTtcclxuXHJcblx0XHRcdGlmIChOdW1iZXIoJGVsZW1lbnQuZGF0YXNldC5vZmZzZXQpID4gMCkge1xyXG5cdFx0XHRcdHRoaXMub2Zmc2V0ID0gKE51bWJlcigkZWxlbWVudC5kYXRhc2V0Lm9mZnNldCkgKyBOdW1iZXIoJGVsZW1lbnQuZGF0YXNldC5jbnQpKSB8fCAwO1xyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3Mub2Zmc2V0ID0gTnVtYmVyKCRlbGVtZW50LmRhdGFzZXQub2Zmc2V0KSB8fCAwO1xyXG5cdFx0XHRcdHRoaXMuaXNPZmZzZXQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgJHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1yb2xsdXAtdG9nZ2xlPVxcXCJcIiArIHRoaXMudGFyZ2V0ICsgXCJcXFwiXVwiKTtcclxuXHRcdFx0aWYgKCR0b2dnbGUpIHRoaXMudG9nZ2xlKCR0b2dnbGUsIGNhbGxiYWNrKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJJbml0aWFsaXphdGlvbiBmYWlsZWRcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRpbml0KCRzZWxmLCBpc0J1dHRvbkFwcGVuZCA9IHRydWUpIHtcclxuXHRcdGxldCBfdGhpcyA9IHRoaXMsXHJcblx0XHRcdHNlbGZfaGVpZ2h0ID0gJHNlbGYuY2xpZW50SGVpZ2h0LCBzZXRfaGVpZ2h0ID0gcGFyc2VJbnQoJHNlbGYuZGF0YXNldC5oZWlnaHQpIHx8IChzZWxmX2hlaWdodCAvIDIpO1xyXG5cclxuXHRcdGxldCBpc0ZhZGUgPSAkc2VsZi5kYXRhc2V0LmZhZGUgIT09IFwiZmFsc2VcIiAmJiBfdGhpcy5zZXR0aW5ncy5mYWRlLFxyXG5cdFx0XHRpc1RyYW5zaXRpb24gPSAkc2VsZi5kYXRhc2V0LnRyYW5zaXRpb24gPT09IFwidHJ1ZVwiIHx8IF90aGlzLnNldHRpbmdzLnRyYW5zaXRpb24sXHJcblx0XHRcdGlzRWxsaXBzaXMgPSAkc2VsZi5kYXRhc2V0LmxpbmUgfHwgX3RoaXMuc2V0dGluZ3MuZWxsaXBzaXMubGluZSAhPT0gbnVsbCxcclxuXHRcdFx0aXNCdXR0b24gPSAkc2VsZi5kYXRhc2V0LmJ1dHRvbiAhPT0gXCJmYWxzZVwiICYmIF90aGlzLnNldHRpbmdzLmJ1dHRvbixcclxuXHRcdFx0aXNTaG93TnVtID0gJHNlbGYuZGF0YXNldC5zaG93TnVtID09PSBcInRydWVcIiB8fCBfdGhpcy5zZXR0aW5ncy5zaG93TnVtO1xyXG5cclxuXHRcdGlmICghaXNCdXR0b25BcHBlbmQpIF90aGlzLnN3aXRjaCgkc2VsZik7XHJcblxyXG5cdFx0aWYgKHNlbGZfaGVpZ2h0ID4gc2V0X2hlaWdodCAmJiBfdGhpcy5zZXR0aW5ncy5jb250ZW50ID09PSAndGV4dCcpIHtcclxuXHRcdFx0JHNlbGYuY2xhc3NMaXN0LmFkZChfdGhpcy5jbGFzc2VzLmhpZGRlbik7XHJcblx0XHRcdCRzZWxmLnN0eWxlLmhlaWdodCA9IHNldF9oZWlnaHQgKyBcInB4XCI7XHJcblxyXG5cdFx0XHRlbGxpcHNpcygpO1xyXG5cdFx0XHR0cmFuc2l0aW9uKCk7XHJcblx0XHRcdGZhZGUoKTtcclxuXHRcdFx0YnV0dG9uKCk7XHJcblx0XHR9IGVsc2UgaWYgKF90aGlzLnNldHRpbmdzLmNvbnRlbnQgPT09ICdlbGVtZW50cycpIHtcclxuXHRcdFx0bGV0IGVsZW1lbnRDbGFzcyA9ICRzZWxmLmRhdGFzZXQuZWxlbWVudHMgfHwgJ2l0ZW0nLFxyXG5cdFx0XHRcdGl0ZW1zID0gJHNlbGYucXVlcnlTZWxlY3RvckFsbCgnLicgKyBlbGVtZW50Q2xhc3MpLFxyXG5cdFx0XHRcdGNudCA9IE51bWJlcigkc2VsZi5kYXRhc2V0LmNudCkgfHwgNSxcclxuXHRcdFx0XHRpID0gMTtcclxuXHJcblx0XHRcdF90aGlzLnRvdGFsID0gaXRlbXMubGVuZ3RoO1xyXG5cdFx0XHRfdGhpcy5jb3VudCA9IGNudDtcclxuXHJcblx0XHRcdGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG5cdFx0XHRcdGlmIChpID4gY250KSB7XHJcblx0XHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpKys7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpc0J1dHRvbiA9PT0gdHJ1ZSkgaXNCdXR0b24gPSAoaSAtIDEpID4gY250O1xyXG5cclxuXHRcdFx0ZWxsaXBzaXMoKTtcclxuXHRcdFx0dHJhbnNpdGlvbigpO1xyXG5cdFx0XHRmYWRlKCk7XHJcblx0XHRcdGJ1dHRvbigpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGVsbGlwc2lzKCkge1xyXG5cdFx0XHRpZiAoaXNFbGxpcHNpcykge1xyXG5cdFx0XHRcdGxldCBsaW5lID0gJHNlbGYuZGF0YXNldC5saW5lIHx8IF90aGlzLnNldHRpbmdzLmVsbGlwc2lzLmxpbmU7XHJcblx0XHRcdFx0aXNGYWRlID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdGlmIChsaW5lKSB7XHJcblx0XHRcdFx0XHQkc2VsZi5jbGFzc0xpc3QuYWRkKF90aGlzLmNsYXNzZXMuZWxsaXBzaXMpO1xyXG5cclxuXHRcdFx0XHRcdCRzZWxmLnN0eWxlLndlYmtpdExpbmVDbGFtcCA9IGxpbmU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVGhlIFtkYXRhLWxpbmVdIG9yIHBhcmFtW2xpbmVdIHZhcmlhYmxlIHNob3VsZCBub3QgYmUgZW1wdHlcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0ZnVuY3Rpb24gdHJhbnNpdGlvbigpIHtcclxuXHRcdFx0aWYgKGlzVHJhbnNpdGlvbikge1xyXG5cdFx0XHRcdC8vIFRPRE8gbm8gd29ya1xyXG5cdFx0XHRcdCRzZWxmLmNsYXNzTGlzdC5hZGQoX3RoaXMuY2xhc3Nlcy50cmFuc2l0aW9uKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIGZhZGUoKSB7XHJcblx0XHRcdGlmIChpc0ZhZGUpIHtcclxuXHRcdFx0XHQkc2VsZi5jbGFzc0xpc3QuYWRkKF90aGlzLmNsYXNzZXMuZmFkZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRmdW5jdGlvbiBidXR0b24oKSB7XHJcblx0XHRcdGlmIChpc0J1dHRvbkFwcGVuZCkge1xyXG5cdFx0XHRcdCRzZWxmLnNldEF0dHJpYnV0ZShcImlkXCIsIF90aGlzLnRhcmdldCk7XHJcblxyXG5cdFx0XHRcdGlmIChpc0J1dHRvbikge1xyXG5cdFx0XHRcdFx0bGV0IHRleHRTaG93TnVtID0gJyc7XHJcblxyXG5cdFx0XHRcdFx0aWYgKGlzU2hvd051bSkge1xyXG5cdFx0XHRcdFx0XHRsZXQgc3VtID0gKF90aGlzLnRvdGFsKSAtIChfdGhpcy5jb3VudCk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoc3VtID4gMCkge1xyXG5cdFx0XHRcdFx0XHRcdHRleHRTaG93TnVtID0gKCAkc2VsZi5kYXRhc2V0LnNob3dOdW1UZXh0IHx8IF90aGlzLnNldHRpbmdzLnNob3dOdW1UZXh0KSArIHN1bTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGxldCBidG5UZXh0TW9yZSA9ICRzZWxmLmRhdGFzZXQuYnV0dG9uTW9yZSB8fCBfdGhpcy5zZXR0aW5ncy5idXR0b25UZXh0Lm1vcmU7XHJcblx0XHRcdFx0XHQkc2VsZi5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmVuZFwiLCBcIjxkaXYgIGNsYXNzPVxcXCJcIiArIF90aGlzLmNsYXNzZXMuYnV0dG9uICsgXCJcXFwiPjxhIGhyZWY9XFxcIiNcXFwiIGFyaWEtZXhwYW5kZWQ9XFxcImZhbHNlXFxcIiBkYXRhLXJvbGx1cC10b2dnbGU9XFxcIlwiICsgX3RoaXMudGFyZ2V0ICsgXCJcXFwiPlwiICsgYnRuVGV4dE1vcmUgKyB0ZXh0U2hvd051bSArIFwiPC9hPjwvZGl2PlwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN3aXRjaCgkc2VsZiwgc3dpdGNoZXIgPSBmYWxzZSkge1xyXG5cdFx0Y29uc3QgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGlmIChzd2l0Y2hlcikge1xyXG5cdFx0XHR0aGlzLmluaXQoJHNlbGYsIGZhbHNlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdCRzZWxmLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLmhpZGRlbik7XHJcblx0XHRcdCRzZWxmLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc2VzLmVsbGlwc2lzKTtcclxuXHRcdFx0JHNlbGYuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzZXMuZmFkZSk7XHJcblxyXG5cdFx0XHQkc2VsZi5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcclxuXHJcblx0XHRcdGlmIChfdGhpcy5zZXR0aW5ncy5jb250ZW50ID09PSAnZWxlbWVudHMnKSB7XHJcblx0XHRcdFx0bGV0IGNsYXNzTmFtZSA9ICRzZWxmLmRhdGFzZXQuZWxlbWVudHM7XHJcblxyXG5cdFx0XHRcdGxldCBpdGVtcyA9IFsuLi4kc2VsZi5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIGNsYXNzTmFtZSldO1xyXG5cdFx0XHRcdGlmIChpdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdGlmIChfdGhpcy5vZmZzZXQgPiAwKSB7XHJcblx0XHRcdFx0XHRcdGxldCBjbGFzc05hbWUgPSAkc2VsZi5kYXRhc2V0LmVsZW1lbnRzLFxyXG5cdFx0XHRcdFx0XHRcdGl0ZW1zID0gWy4uLiRzZWxmLnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgY2xhc3NOYW1lKV07XHJcblxyXG5cdFx0XHRcdFx0XHRpdGVtcy5zbGljZShfdGhpcy5jb3VudCwgX3RoaXMub2Zmc2V0KS5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKSk7XHJcblx0XHRcdFx0XHRcdF90aGlzLm9mZnNldCA9IF90aGlzLm9mZnNldCArIF90aGlzLnNldHRpbmdzLm9mZnNldDtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChfdGhpcy5vZmZzZXQgPiBpdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5pc09mZnNldCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzLm9mZnNldCA9IDA7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJykpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR0b2dnbGUoJHRvZ2dsZSwgY2FsbGJhY2spIHtcclxuXHRcdGxldCAkX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdCR0b2dnbGUub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGxldCAkYnRuID0gZS50YXJnZXQsIHRhcmdldCA9ICRidG4uZGF0YXNldC5yb2xsdXBUb2dnbGUsIGFyaWEgPSAkYnRuLmdldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIik7XHJcblxyXG5cdFx0XHRsZXQgJHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCk7XHJcblxyXG5cdFx0XHRpZiAoJF90aGlzLm9mZnNldCA+IDApIHtcclxuXHRcdFx0XHRpZiAoJF90aGlzLmlzT2Zmc2V0KSB7XHJcblx0XHRcdFx0XHRhcmlhID0gJ2ZhbHNlJztcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YXJpYSA9ICd0cnVlJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChhcmlhID09PSBcImZhbHNlXCIpIHtcclxuXHRcdFx0XHQkYnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgdHJ1ZSk7XHJcblx0XHRcdFx0JGJ0bi50ZXh0ID0gJHRhcmdldC5kYXRhc2V0LmJ1dHRvbkxlc3MgfHwgJF90aGlzLnNldHRpbmdzLmJ1dHRvblRleHQubGVzcztcclxuXHJcblx0XHRcdFx0aWYgKCRfdGhpcy5vZmZzZXQgPiAwKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygkX3RoaXMuaXNPZmZzZXQpXHJcblxyXG5cdFx0XHRcdFx0aWYgKCRfdGhpcy5pc09mZnNldCkge1xyXG5cdFx0XHRcdFx0XHQkYnRuLnRleHQgPSAkdGFyZ2V0LmRhdGFzZXQuYnV0dG9uTW9yZSB8fCAkX3RoaXMuc2V0dGluZ3MuYnV0dG9uVGV4dC5tb3JlO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0JGJ0bi50ZXh0ID0gJHRhcmdldC5kYXRhc2V0LmJ1dHRvbkxlc3MgfHwgJF90aGlzLnNldHRpbmdzLmJ1dHRvblRleHQubGVzcztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdCRfdGhpcy5zd2l0Y2goJHRhcmdldCwgZmFsc2UpO1xyXG5cclxuXHRcdFx0XHQvLyBUT0RPIGNhbGxiYWNrIHRoZSBhcmVhIGlzIHNob3dcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsZXQgdGV4dFNob3dOdW0gPSAnJyxcclxuXHRcdFx0XHRcdGlzU2hvd051bSA9ICR0YXJnZXQuZGF0YXNldC5zaG93TnVtID09PSBcInRydWVcIiB8fCAkX3RoaXMuc2V0dGluZ3Muc2hvd051bTtcclxuXHJcblx0XHRcdFx0aWYgKGlzU2hvd051bSkge1xyXG5cdFx0XHRcdFx0bGV0IHN1bSA9ICgkX3RoaXMudG90YWwpIC0gKCRfdGhpcy5jb3VudCk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKHN1bSA+IDApIHtcclxuXHRcdFx0XHRcdFx0dGV4dFNob3dOdW0gPSAoJHRhcmdldC5kYXRhc2V0LnNob3dOdW1UZXh0IHx8ICRfdGhpcy5zZXR0aW5ncy5zaG93TnVtVGV4dCkgKyBzdW07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkYnRuLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpO1xyXG5cclxuXHRcdFx0XHQkYnRuLnRleHQgPSAoJHRhcmdldC5kYXRhc2V0LmJ1dHRvbk1vcmUgfHwgJF90aGlzLnNldHRpbmdzLmJ1dHRvblRleHQubW9yZSkgKyB0ZXh0U2hvd051bTtcclxuXHJcblx0XHRcdFx0JF90aGlzLnN3aXRjaCgkdGFyZ2V0LCB0cnVlKTtcclxuXHJcblx0XHRcdFx0Ly8gVE9ETyBjYWxsYmFjayB0aGUgYXJlYSBpcyBoaWRlXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH07XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICog0JPQu9GD0LHQvtC60L7QtSDQvtCx0YrQtdC00LjQvdC10L3QuNC1INC+0LHRitC10LrRgtC+0LJcclxuICogQHBhcmFtIG9iamVjdHNcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5mdW5jdGlvbiBtZXJnZURlZXBPYmplY3QoLi4ub2JqZWN0cykge1xyXG5cdGNvbnN0IGlzT2JqZWN0ID0gb2JqID0+IG9iaiAmJiB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiO1xyXG5cclxuXHRyZXR1cm4gb2JqZWN0cy5yZWR1Y2UoKHByZXYsIG9iaikgPT4ge1xyXG5cdFx0T2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcblx0XHRcdGNvbnN0IHBWYWwgPSBwcmV2W2tleV07XHJcblx0XHRcdGNvbnN0IG9WYWwgPSBvYmpba2V5XTtcclxuXHJcblx0XHRcdGlmIChBcnJheS5pc0FycmF5KHBWYWwpICYmIEFycmF5LmlzQXJyYXkob1ZhbCkpIHtcclxuXHRcdFx0XHRwcmV2W2tleV0gPSBwVmFsLmNvbmNhdCguLi5vVmFsKTtcclxuXHRcdFx0fSBlbHNlIGlmIChpc09iamVjdChwVmFsKSAmJiBpc09iamVjdChvVmFsKSkge1xyXG5cdFx0XHRcdHByZXZba2V5XSA9IG1lcmdlRGVlcE9iamVjdChwVmFsLCBvVmFsKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwcmV2W2tleV0gPSBvVmFsO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gcHJldjtcclxuXHR9LCB7fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZHUm9sbHVwO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7VkdSb2xsdXB9IGZyb20gXCIuL3NyYy9WR1JvbGx1cFwiO1xyXG5pbXBvcnQgXCIuL3NyYy9WR1JvbGx1cC9zY3NzL3Zncm9sbHVwLnNjc3NcIjtcclxuXHJcbmV4cG9ydCB7XHJcblx0VkdSb2xsdXBcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=