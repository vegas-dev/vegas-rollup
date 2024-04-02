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

				this.settings = mergeDeepObject({
						content: 'text',
						fade: true,
						transition: false,
						ellipsis: {
								line: null
						},
						button: true,
						buttonText: {
								more: "More",
								less: "Less"
						}
				}, arg);

				if (this.target) {
						let $element = document.getElementById(this.target);
						this.init($element);

						let $toggle = document.querySelector("[data-rollup-toggle=\"" + this.target + "\"]");
						if ($toggle) this.toggle($toggle, callback);
				} else {
						console.error("Initialization failed");
				}
		}

		init($self, isButtonAppend = true) {
				let _this = this,
						self_height = $self.clientHeight, set_height = parseInt($self.dataset.height) || (self_height / 2);

				let isFade = $self.dataset.fade !== "false" && _this.settings.fade,
					isTransition = $self.dataset.transition === "true" || _this.settings.transition,
					isEllipsis = $self.dataset.line || _this.settings.ellipsis.line !== null,
					isButton = $self.dataset.button !== "false" && _this.settings.button;

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

						for (const item of items) {
							if (i > cnt) {
								item.classList.add('d-none')
							}

							i++;
						}

						isButton = (i - 1) > cnt;

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
										let btnTextMore = $self.dataset.buttonMore || _this.settings.buttonText.more;
										$self.insertAdjacentHTML("afterend", "<div  class=\"" + _this.classes.button + "\"><a href=\"#\" aria-expanded=\"false\" data-rollup-toggle=\"" + _this.target + "\">" + btnTextMore + "</a></div>");
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
							let className = $self.dataset.elements

							let items = [...$self.querySelectorAll('.' + className)];
							if (items.length) {
									items.forEach((item) => item.classList.remove('d-none'))
							}
						}
				}
		}

		toggle($toggle, callback) {
				let $_this = this;

				$toggle.onclick = function(e) {
						let $btn = e.target, target = $btn.dataset.rollupToggle, aria = $btn.getAttribute("aria-expanded");

						let $target = document.getElementById(target);

						if (aria === "false") {
								$btn.setAttribute("aria-expanded", true);
								$btn.text = $target.dataset.buttonLess || $_this.settings.buttonText.less;

								$_this.switch($target, false);

								// TODO callback the area is show
						} else {
								$btn.setAttribute("aria-expanded", false);
								$btn.text = $target.dataset.buttonMore || $_this.settings.buttonText.more;

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

export default VGRollup;
