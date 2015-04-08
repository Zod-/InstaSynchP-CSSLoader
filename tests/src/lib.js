//http://joquery.com/2012/string-format-for-javascript
if (typeof String.prototype.format !== 'function') {
  String.prototype.format = function () {
    'use strict';
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = this;
    var i;
    var regEx;

    // start with the second argument (i = 1)
    for (i = 0; i < arguments.length; i += 1) {
      // "gm" = RegEx options for Global search (more than one instance)
      // and for Multiline search
      regEx = new RegExp('\\{' + (i) + '\\}', 'gm');
      theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
  };
}

window.logger = function() {
  'use strict';
  function log() {
    console.log(arguments);
  }

  return {
    debug: log,
    info: log,
    error: log
  };
}
