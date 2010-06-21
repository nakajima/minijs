$CALLBACKS = { before: [], after: [] }

function before(callback) {
  $CALLBACKS.before.push(callback)
}

function test(name, example) {
  $.each($CALLBACKS.before, function() { this(); });

  if (!example) {
    console.info('PEND ' + name);
    return;
  }

  try { example() ?
    console.info('OK   ' + name) :
    console.info('FAIL ' + name); } catch(e) {
    console.info('ERR  ' + e);
  }
}
