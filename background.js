/**
 Two parameters received:
 - currentUrl as provided by the browser
 - eventType as the type of event raised
 */
function isPunyCodeString(str) {
  var punyCodeStringPrefix = "xn--";
  return str.indexOf(punyCodeStringPrefix) > -1;
}

function sendAlertNotification(url) {
  var title = "Be careful! The real domain name is: ";
  var text = url;

  new Notification(title, {
    icon: 'icon-128.png',
    body: text,
  });
}

function setBadge(isUnsafe) {
  if(isUnsafe) {
    chrome.browserAction.setBadgeText({
      "text": '⚠️️'
    });
    chrome.browserAction.setBadgeBackgroundColor({
      color: "red"
    });
  } else {
    chrome.browserAction.setBadgeText({
      "text": ''
    });
  }
}

// Add event listener when new page loaded
chrome.runtime.onMessage.addListener(function(message, info){
    var hostname = message.hostname;
    var isUnsafe = isPunyCodeString(hostname);
    if(isUnsafe) {
      setBadge(true);
      sendAlertNotification(hostname);
    } else {
      setBadge(false);
    }
})

// Add event listener when activeTab changes
chrome.tabs.onActivated.addListener(function(evt){
  chrome.tabs.get(evt.tabId, function(tab){
    var url = tab.url;
    setBadge(isPunyCodeString(url));
  });
});
