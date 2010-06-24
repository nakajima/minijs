(function() {
  if (typeof $ == 'undefined') {
    throw("You must load base.js first!")
  }

  $.fn.on = function(eventName, handler) {
    return this.each(function() {
      var elem = this;
      elem.addEventListener(eventName, function(event) {
        if (handler.call($(this), event) === false) {
          event.preventDefault();
        }
      }, true);
    });
  }
})();
