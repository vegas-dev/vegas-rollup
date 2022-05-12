window.VGSlidingContent = {
	numeric: 1,
	target: 'rollup-content-',
	buttonText: {
		more: 'More',
		less: 'Less'
	},
	classes: {
		hidden: 'vg-rollup-content--hidden',
		fade: 'vg-rollup-content--fade',
		ellipsis: 'vg-rollup-content--ellipsis',
		button: 'vg-rollup-content--button',
	},

	init: function ($self, is_button_append = true) {
		let set_height = $self.dataset.height || null,
			self_height = $self.clientHeight;

		if (!set_height) {
			console.log('The [data-height] variable should not be empty')

			return;
		}

		let is_fade = $self.dataset.fade !== 'false',
			is_ellipsis = $self.dataset.ellipsis === 'true',
			is_button = $self.dataset.button !== 'false';

		this.switch($self);

		if (self_height > set_height) {
			$self.classList.add(this.classes.hidden);
			$self.style.height = set_height + 'px';

			if (is_ellipsis) {
				let line = $self.dataset.line || null;
				is_fade = false;

				if (line) {
					$self.classList.add(this.classes.ellipsis);

					$self.style.webkitLineClamp = line;
				} else {
					console.log('The [data-line] variable should not be empty')
				}
			}

			if (is_fade) {
				$self.classList.add(this.classes.fade);
			}

			if (is_button_append) {
				$self.setAttribute('id', this.target + this.numeric);

				if (is_button) {
					let btnTextMore = $self.dataset.buttonMore || this.buttonText.more;
					$self.insertAdjacentHTML('afterend', '<div  class="' + this.classes.button + '"><a href="#" aria-expanded="false" data-rollup-toggle="' + this.target + this.numeric + '">' + btnTextMore + '</a></div>');
				}
			}

			this.numeric++;
		}
	},

	switch: function ($self, switcher = false) {
		if (switcher) {
			this.init($self, false);
		} else {
			$self.classList.remove(this.classes.hidden);
			$self.classList.remove(this.classes.ellipsis);
			$self.classList.remove(this.classes.fade);

			$self.removeAttribute('style');
		}
	},

	toggle: function ($self) {
		$self.onclick = function (e) {
			let $btn = e.target,
				target = $btn.dataset.rollupToggle,
				aria = $btn.getAttribute('aria-expanded');

			let $target = document.getElementById(target);

			if (aria === 'false') {
				$btn.setAttribute('aria-expanded', true);
				$btn.text = $target.dataset.buttonLess || VGSlidingContent.buttonText.less;

				VGSlidingContent.switch($target, false);
			} else {
				$btn.setAttribute('aria-expanded', false);
				$btn.text = $target.dataset.buttonMore || VGSlidingContent.buttonText.more;

				VGSlidingContent.switch($target, true);
			}

			return false;
		}
	}
};

let $containerSliding = document.querySelectorAll('[data-rollup-content]');
for(let i = 1; i <= $containerSliding.length; i++) {
	VGSlidingContent.init($containerSliding[i - 1]);
}

let $togglesSliding = document.querySelectorAll('[data-rollup-toggle]');
for(let i = 1; i <= $togglesSliding.length; i++) {
	VGSlidingContent.toggle($togglesSliding[i - 1]);
}
