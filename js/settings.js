let value;

function saveSettingsInForm(e) {
  e.preventDefault();
  e.stopPropagation();

  const start = window.parseInt(document.querySelector('#startYear').value);
  const end = window.parseInt(document.querySelector('#endYear').value);

  if(start > end) return; // start cannot be larger than end

  chrome.storage.sync.set({
    'startYear': start || 1900,
    'endYear': end || (new Date().getFullYear())
  }, function () {
    console.log('Viafilter: Saved settings.');
  })

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.update(tabs[0].id, {
      url: tabs[0].url
    })
  })
}

function retrieveWithChromeStorage() {
  chrome.storage.sync.get(['startYear', 'endYear'], function (items) {
    items.startYear = items.startYear || 1900;
    items.endYear = items.endYear || (new Date().getFullYear());

    document.querySelector('#startYear').value = items.startYear;
    document.querySelector('#endYear').value = items.endYear;

    console.log('Viafilter: Retrieved settings from cs chrome storage.', items);
  })
}

document.addEventListener('DOMContentLoaded', retrieveWithChromeStorage);

document.querySelector('#updateBtn').addEventListener('click', saveSettingsInForm);