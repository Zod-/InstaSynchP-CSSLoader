function CSSLoader() {
  'use strict';
  this.version = '{{ VERSION }}';
  this.name = 'InstaSynchP CSSLoader';
  this.styles = {};
}

CSSLoader.prototype.executeOnceCore = function () {
  'use strict';
  var th = this;
  window.cssLoader = (function () {

    return {
      'add': function (style) {
        //set the id as the name if it didn't get set
        if (!style.id) {
          style.id = style.name;
        }

        //save the style
        th.styles[style.name] = style;

        //load it
        if (style.autoload) {
          window.cssLoader.load(style.name);
        }
      },
      'load': function (styleName) {
        var style = th.styles[styleName],
          id = '#{0}'.format(style.id);
        $(id).remove();

        $('head').append(
          $('<link>', {
            'rel': 'stylesheet',
            'type': 'text/css',
            'id': style.id,
            'href': style.url
          }).on('load', function () {
            var ref = this;
            //fire event after the CSS has been loaded
            setTimeout(function () {
              events.fire('CSSLoad[{0}]'.format($(ref).attr(
                'id')));
            }, 1000);
          })
        );
        //if the is nothing to load fire the event directly
        if (style.url === '') {
          events.fire('CSSLoad[{0}]'.format(style.id));
        }
      }
    };
  }());
};

window.plugins = window.plugins || {};
window.plugins.cssLoader = new CSSLoader();