"use strict";

class VGRollup {
  constructor(target, arg, callback) {
    this.target = target || undefined;
    this.classes = {
      hidden: 'vg-rollup-content--hidden',
      fade: 'vg-rollup-content--fade',
      ellipsis: 'vg-rollup-content--ellipsis',
      button: 'vg-rollup-content--button',
      transition: 'vg-rollup-content--transition'
    };
    this.settings = Object.assign({
      fade: true,
      transition: false,
      ellipsis: {
        line: null
      },
      button: true,
      buttonText: {
        more: 'More',
        less: 'Less'
      }
    }, arg);

    if (this.target) {
      var $element = document.getElementById(this.target);
      this.init($element);
      var $toggle = document.querySelector('[data-rollup-toggle="' + this.target + '"]');
      if ($toggle) this.toggle($toggle, callback);
    } else {
      console.error('Initialization failed');
    }
  }

  init($self) {
    var is_button_append = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var self_height = $self.clientHeight,
        set_height = $self.dataset.height || self_height / 2;
    var is_fade = $self.dataset.fade !== 'false' && this.settings.fade,
        is_transition = $self.dataset.transition === 'true' || this.settings.transition,
        is_ellipsis = $self.dataset.line || this.settings.ellipsis.line !== null,
        is_button = $self.dataset.button !== 'false' && this.settings.button;
    if (!is_button_append) this.switch($self);

    if (self_height > set_height) {
      $self.classList.add(this.classes.hidden);
      $self.style.height = set_height + 'px';

      if (is_ellipsis) {
        var line = $self.dataset.line || this.settings.ellipsis.line;
        is_fade = false;

        if (line) {
          $self.classList.add(this.classes.ellipsis);
          $self.style.webkitLineClamp = line;
        } else {
          console.log('The [data-line] or param[line] variable should not be empty');
        }
      }

      if (is_transition) {
        // TODO no work
        $self.classList.add(this.classes.transition);
      }

      if (is_fade) {
        $self.classList.add(this.classes.fade);
      }

      if (is_button_append) {
        $self.setAttribute('id', this.target);

        if (is_button) {
          var btnTextMore = $self.dataset.buttonMore || this.settings.buttonText.more;
          $self.insertAdjacentHTML('afterend', '<div  class="' + this.classes.button + '"><a href="#" aria-expanded="false" data-rollup-toggle="' + this.target + '">' + btnTextMore + '</a></div>');
        }
      }
    }
  }

  switch($self) {
    var switcher = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (switcher) {
      this.init($self, false);
    } else {
      $self.classList.remove(this.classes.hidden);
      $self.classList.remove(this.classes.ellipsis);
      $self.classList.remove(this.classes.fade);
      $self.removeAttribute('style');
    }
  }

  toggle($toggle, callback) {
    var $_this = this;

    $toggle.onclick = function (e) {
      var $btn = e.target,
          target = $btn.dataset.rollupToggle,
          aria = $btn.getAttribute('aria-expanded');
      var $target = document.getElementById(target);

      if (aria === 'false') {
        $btn.setAttribute('aria-expanded', true);
        $btn.text = $target.dataset.buttonLess || $_this.settings.buttonText.less;
        $_this.switch($target, false); // TODO callback the area is show
      } else {
        $btn.setAttribute('aria-expanded', false);
        $btn.text = $target.dataset.buttonMore || $_this.settings.buttonText.more;
        $_this.switch($target, true); // TODO callback the area is hide
      }

      return false;
    };
  }

}
