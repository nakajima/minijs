(function() {
  if (typeof $ == 'undefined') {
    throw("You must load base.js first!")
  }

  var delegators = {};

  $.fn.on = function(eventName, handler) {
    return this.each(function() {
      var elem = this;
      elem.addEventListener(eventName, function(event) {
        if (handler.call($(elem), event) === false) {
          event.preventDefault();
        }
      }, true);
    });
  }

  $.fn.live = function(eventName, handler) {
    $.delegate(eventName, this.selector, handler);
  }

  $.delegate = function(eventName, css, handler) {
    if (!delegators[eventName]) {
      delegators[eventName] = [];
      document.addEventListener(eventName, function(event) {
        $.each(delegators[eventName], function() {
          this.call(this, event);
        });
      }, false)
    }

    delegators[eventName].push(function(event) {
      var elem = event.target;
      if ($(elem).is(css)) {
        if (handler.call($(elem), event) === false) {
          event.preventDefault();
        }
      }
    });
  }
})();
