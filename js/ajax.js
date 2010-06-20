(function() {
  if (typeof $ == 'undefined') {
    throw("You must load base.js first!")
  }

  function request(method, url, callback) {
    var request = new XMLHttpRequest();
    request.open(method, url);
    request.onreadystatechange = function() {
      if (request.readyState == 4) { // Loaded!
        callback(request.responseText, request)
      }
    }
    request.send();
  }

  function get(url, callback) {
    request('GET', url, callback);
  }

  function post(url, callback) {
    request('POST', url, callback);
  }

  $.get = get;
  $.post = post;
})();
