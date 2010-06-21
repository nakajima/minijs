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

  try {
    var passes = example()
    if (passes) {
      console.info('OK   ' + name);
    } else {
      console.info('FAIL ' + name);
    }
  } catch(e) {
    console.info('ERR  ' + e);
  }

}
