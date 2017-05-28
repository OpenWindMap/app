/* eslint-disable */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
/* eslint-enable */

const fields = {
  // note: you can use a single tracking id for both the app and the website,
  // don't worry it won't mix the data. More about this in the 3rd section
  trackingId: 'UA-51509273-7'
}

export function init() {
  // if we are in the app (the protocol will be file://)
  if (document.URL.indexOf('file://') === 0) {
    // we store and provide the clientId ourselves in localstorage since there are no
    // cookies in Cordova
    fields.clientId = localStorage.getItem('ga:clientId')
    // disable GA's cookie storage functions
    fields.storage = 'none'

    window.ga('create', fields)

    // prevent tasks that would abort tracking
    window.ga('set', {
      // don't abort if the protocol is not http(s)
      checkProtocolTask: null,
      // don't expect cookies to be enabled
      checkStorageTask: null
    })

    // a callback function to get the clientId and store it ourselves
    window.ga(tracker => {
      localStorage.setItem('ga:clientId', tracker.get('clientId'))
    })

    // return ga function for futur uses
    return window.ga
  }
  // else we are in a browser
  window.ga('create', fields)

  // return ga function for futur uses
  return window.ga
}
