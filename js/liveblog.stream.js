(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.liveblogStream = {
    attach: function(context, settings) {
      new LiveblogStream($('.liveblog-posts-container', context)[0], {
        getURL: settings.liveblog.getURL,
        getNextURL: settings.liveblog.getNextURL
      })
    },
    trigger: function(event, data, context) {
      var element = $('.liveblog-posts-container', context)[0]
      switch(event) {
        case 'created':
          // TODO: provide a polyfill for IE (https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
          element.dispatchEvent(new CustomEvent('post:created', { 'detail': data }))
          break
        case 'updated':
          element.dispatchEvent(new CustomEvent('post:updated', { 'detail': data }))
          break
      }
    }
  }
})(jQuery, Drupal, drupalSettings);