// @vegas-VGRollup v1.0.4
class t{constructor(t,e,s){if(this.target=t||void 0,this.classes={hidden:"vg-rollup-content--hidden",fade:"vg-rollup-content--fade",ellipsis:"vg-rollup-content--ellipsis",button:"vg-rollup-content--button",transition:"vg-rollup-content--transition"},this.settings=Object.assign({fade:!0,transition:!1,ellipsis:{line:null},button:!0,buttonText:{more:"More",less:"Less"}},e),this.target){let t=document.getElementById(this.target);this.init(t);let e=document.querySelector('[data-rollup-toggle="'+this.target+'"]');e&&this.toggle(e,s)}else console.error("Initialization failed")}init(t,e=!0){let s=t.clientHeight,i=parseInt(t.dataset.height)||s/2,a="false"!==t.dataset.fade&&this.settings.fade,l="true"===t.dataset.transition||this.settings.transition,n=t.dataset.line||null!==this.settings.ellipsis.line,o="false"!==t.dataset.button&&this.settings.button;if(e||this.switch(t),s>i){if(t.classList.add(this.classes.hidden),t.style.height=i+"px",n){let e=t.dataset.line||this.settings.ellipsis.line;a=!1,e?(t.classList.add(this.classes.ellipsis),t.style.webkitLineClamp=e):console.log("The [data-line] or param[line] variable should not be empty")}if(l&&t.classList.add(this.classes.transition),a&&t.classList.add(this.classes.fade),e&&(t.setAttribute("id",this.target),o)){let e=t.dataset.buttonMore||this.settings.buttonText.more;t.insertAdjacentHTML("afterend",'<div  class="'+this.classes.button+'"><a href="#" aria-expanded="false" data-rollup-toggle="'+this.target+'">'+e+"</a></div>")}}}switch(t,e=!1){e?this.init(t,!1):(t.classList.remove(this.classes.hidden),t.classList.remove(this.classes.ellipsis),t.classList.remove(this.classes.fade),t.removeAttribute("style"))}toggle(t,e){let s=this;t.onclick=function(t){let e=t.target,i=e.dataset.rollupToggle,a=e.getAttribute("aria-expanded"),l=document.getElementById(i);return"false"===a?(e.setAttribute("aria-expanded",!0),e.text=l.dataset.buttonLess||s.settings.buttonText.less,s.switch(l,!1)):(e.setAttribute("aria-expanded",!1),e.text=l.dataset.buttonMore||s.settings.buttonText.more,s.switch(l,!0)),!1}}}export{t as VGRollup};
