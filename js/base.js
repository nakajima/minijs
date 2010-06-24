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
  var proxy = function(elems) {
    this.elems = elems;
    this.length = elems.length;
  }

  var methods = {
    each: function(callback) {
      each(this.elems, callback)
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

    get: function(index) {
      if (typeof index == "undefined") {
        return this.elems.length == 1 ? this.elems[0] : this.elems;
      } else {
        return this.elems[index];
      }
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
      var nodes = [];
      var i = nodeSet.length;
      while (i--) { nodes.unshift(nodeSet[i]); }
    } else {
      var nodes = [cssOrElem];
    }

    return new proxy(nodes);
  }

  window.$ = $;
  $.fn = proxy.prototype;
  $.each = each;
})();
