$CALLBACKS = { before: [], after: [] }

function escapeHTML(string) {
  return string.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function result(name, text, example) {
  example = example || function() { }
  $('#results').append('<li class=' + name + '>' + text +
    '<pre>' + escapeHTML(example.toString()) + '</pre>' +
  '</li>')
}

function before(callback) {
  $CALLBACKS.before.push(callback)
}

function test(name, example) {
  $.each($CALLBACKS.before, function() { this(); });

  if (!example) {
    result('PEND', 'PENDING: ' + name, example);
    return;
  }

  try { example() ?
    result('OK', name, example) :
    result('FAIL', name, example); } catch(e) {
    result('ERR', e, example);
  }
}

$.delegate('click', 'li', function() {
  this.toggleClass('show');
});
