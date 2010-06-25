(function() {
  // Helpers
  function each(collection, callback) {
    for (i in collection) {
      var item = collection[i];
      if (collection.hasOwnProperty(i)) {
        callback.call(item);
      }
    }
  }

  // Collection Proxy Stuff
  var proxy = function(css, elems) {
    this.selector = css;
    this.elems = elems;
    this.length = elems.length;
  }

  var methods = {
    each: function(callback) {
      this.elems.forEach(function(elem) {
        callback.call(elem);
      });
      return this;
    },

    css: function(styles) {
      return this.each(function() {
        for (prop in styles) {
          this.style[prop] = styles[prop];
        }
      });
    },

    attr: function() {
      var prop = arguments[0], value = arguments[1];
      if (value) {
        return this.each(function() {
          this.setAttribute(prop, value);
        });
      } else {
        return this.get().getAttribute(prop);
      }
    },

    removeAttr: function(prop) {
      return this.each(function() {
        this.removeAttribute(prop);
      });
    },

    addClass: function(classNames) {
      return this.each(function() {
        var classes = this.className.split(/\s+/);
        classes.push(classNames);
        this.className = classes.join(' ');
      });
    },

    removeClass: function(classNames) {
      return this.each(function() {
        var classes = this.className.split(/\s+/);
        classNames = classNames.split(/\s+/);
        classNames.forEach(function(s) {
          delete(classes[classes.indexOf(s)]);
        });
        this.className = classes.join(' ');
      });
    },

    is: function(selector) {
      return this.get(0).webkitMatchesSelector(selector)
    },

    get: function(index) {
      if (typeof index == "undefined") {
        return this.elems.length == 1 ? this.elems[0] : this.elems;
      } else {
        return this.elems[index];
      }
    },

    toArray: function() {
      return this.elems;
    },

    size: function() {
      return this.elems.length;
    },

    prepend: function(content) {
      return this.each(function() {
        this.innerHTML = content + this.innerHTML;
      });
    },

    append: function(content) {
      return this.each(function() {
        this.innerHTML = this.innerHTML + content;
      });
    },

    html: function(content) {
      if (content) {
        return this.each(function() {
          this.innerHTML = content;
        });
      } else {
        return this.get(0).innerHTML;
      }
    },

    val: function(content) {
      if (content) {
        return this.each(function() {
          this.value = content;
        });
      } else {
        return this.get(0).value;
      }
    }
  }

  each(methods, function() {
    proxy.prototype[i] = methods[i];
  });

  function $(cssOrElem) {
    if (typeof cssOrElem == 'string') {
      var nodeSet = document.querySelectorAll(cssOrElem);
      var nodes = Array.prototype.slice.apply(nodeSet);
    } else {
      var nodes = [cssOrElem];
    }

    return new proxy(cssOrElem, nodes);
  }

  window.$ = $;
  $.fn = proxy.prototype;
  $.each = each;
})();
