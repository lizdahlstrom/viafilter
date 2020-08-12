MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let observer = new MutationObserver(function(mutations, observer){
  filterItems();
});

observer.observe(document, {
  subtree: true,
  attributes: true
});

filterItems();

function filterItems() {
  chrome.storage.sync.get(['startYear', 'endYear'], function (items) {

    items.startYear = items.startYear || 1900;
    items.endYear = items.endYear || (new Date().getFullYear());

    document.querySelectorAll('[data-testhook=item]').forEach(function (e) {
      let movieUrl = e.firstChild.getElementsByTagName('a')[0].href;
      let yearReleased = movieUrl.slice(-4);

      if (e.style.display !== "none" && (yearReleased < items.startYear || yearReleased > items.endYear)) {
        e.style.display = "none";
      }
      else if (e.style.display === "none" && (yearReleased > items.startYear || yearReleased  < items.endYear)){
       e.style.display = "compact";
      }
    });

  });

}