chrome.runtime.sendMessage({type: "pageLoaded", hostname: window.location.hostname}, function(response) {
  console.log(response.farewell);
});