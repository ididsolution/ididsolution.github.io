var IS_ARCHIVE = 1;


function initFlyouts() {
  initPublishedFlyoutMenus(
    [{
      "id": "817708672520187469",
      "title": "Home",
      "url": "index.html",
      "target": "",
      "nav_menu": false,
      "nonclickable": false
    },
    {
      "id": "951052402158070607",
      "title": "About Us",
      "url": "about-us.html",
      "target": "",
      "nav_menu": false,
      "nonclickable": false
    },
    {
      "id": "646423909545470739",
      "title": "Locations",
      "url": "locations.html",
      "target": "",
      "nav_menu": false,
      "nonclickable": false
    },
    {
      "id": "931450842924258809",
      "title": "Contact Us",
      "url": "contact-us.html",
      "target": "",
      "nav_menu": false,
      "nonclickable": false
    },
    {
      "id": "221003514715643967",
      "title": "Price List",
      "url": "price-list.html",
      "target": "",
      "nav_menu": false,
      "nonclickable": false
    },
    {
      "id": "884099455981035589",
      "title": "New Arrival",
      "url": "new-arrival.html",
      "target": "",
      "nav_menu": false,
      "nonclickable": false
    },
    {
      "id": "custom001",
      "title": "Gallery",
      "url": "customersgallery.html",
      "target": "",
      "nav_menu": false,
      "nonclickable": false
    }
    ],
    "817708672520187469",
    '',
    'active',
    false,
    { "navigation\/item": "{{!\n\tNOTES:\n\t- an id and the \"wsite-menu-item-wrap\" class are required on the item wrapper\n\t- a \"wsite-menu-item\" class is required on the item link\n\t- an is_current variable is available\n\t- the current link will automagically get an \"active\" id\n}}\n\n<li {{#id}}id=\"{{id}}\"{{\/id}}\n\tclass=\"wsite-menu-item-wrap\"\n\t>\n\t<a {{^nonclickable}}\n\t\t\t\t{{^nav_menu}}\n\t\t\t\t\thref=\"{{url}}\"\n\t\t\t\t{{\/nav_menu}}\n\t\t\t{{\/nonclickable}}\n\t\t{{#target}}target=\"{{target}}\"{{\/target}}\n\t\tclass=\"wsite-menu-item {{#has_children}}subnav-link{{\/has_children}}\"\n\t\t{{#membership_required}}\n\t\t\tdata-membership-required=\"{{.}}\"\n\t\t{{\/membership_required}}\n\t\t{{#has_children}}\n\t\t\tdata-submenu=\"submenu-{{id}}\"\n\t\t{{\/has_children}}\n\t\t>\n\t\t{{{title_html}}}\n\t{{#has_children}}<span class=\"wsite-menu-arrow\"><\/span>{{\/has_children}}\n\t<\/a>\n\t{{#has_children}}{{> navigation\/flyout\/list}}{{\/has_children}}\n<\/li>", "navigation\/flyout\/list": "{{!\n\tNOTES:\n\t- \"wsite-menu-wrap\" required on submenu wrapper\n\t- \"wsite-menu\" required on submenu element\n}}\n\n<div class=\"wsite-menu-wrap\" style=\"display:none\">\n\t<ul class=\"wsite-menu\" {{#id}}id=\"submenu-{{id}}\"{{\/id}}>\n\t\t{{#children}}{{> navigation\/flyout\/item}}{{\/children}}\n\t<\/ul>\n<\/div>", "navigation\/flyout\/item": "{{!\n\tNOTES:\n\t- an id and \"wsite-menu-subitem-wrap\" class are required on the item wrap\n\t- a \"wsite-menu-subitem\" class is required on the item link\n}}\n\n<li {{#id}}id=\"{{id}}\"{{\/id}}\n\tclass=\"wsite-menu-subitem-wrap {{#is_current}}wsite-nav-current{{\/is_current}}\"\n\t>\n\t<a {{^nonclickable}}\n\t\t\t{{^nav_menu}}\n\t\t\t\thref=\"{{url}}\"\n\t\t\t{{\/nav_menu}}\n\t\t{{\/nonclickable}}\n\t\t{{#target}}target=\"{{target}}\"{{\/target}}\n\t\tclass=\"wsite-menu-subitem {{#has_children}}subnav-link{{\/has_children}}\"\n\t\t{{#has_children}}\n\t\t\tdata-submenu=\"submenu-{{id}}\"\n\t\t{{\/has_children}}\n\t\t>\n\t\t<span class=\"wsite-menu-title\">\n\t\t\t{{{title_html}}}\n\t\t<\/span>{{#has_children}}<span class=\"wsite-menu-arrow\">&gt;<\/span>{{\/has_children}}\n\t<\/a>\n\t{{#has_children}}{{> navigation\/flyout\/list}}{{\/has_children}}\n<\/li>" },
    { "hasCustomMinicart": true }
  )

  // 2. Automatically inject the Gallery link into the HTML menu list
  var menuContainers = document.querySelectorAll(".wsite-menu-default");
  menuContainers.forEach(function (menu) {
    // Check if we already injected the link to prevent duplication
    if (!menu.querySelector("#pgcustom001")) {
      var li = document.createElement("li");
      li.id = "pgcustom001";
      li.className = "wsite-menu-item-wrap";

      var a = document.createElement("a");
      a.href = "customersgallery.html";
      a.className = "wsite-menu-item";
      a.textContent = "Gallery";

      li.appendChild(a);
      menu.appendChild(li);
    }
  });
}

window.addEventListener('error', function (event) {
  console.log("errrrr");  // We only care about <img> elements failing to load
  var target = event.target;
  if (target && target.tagName === 'IMG') {

    // Read our custom retry state to prevent infinite loops
    var attempt = parseInt(target.getAttribute('data-retry-attempt') || '0', 10);
    var originalSrc = target.getAttribute('data-original-src') || target.src;

    // If it's our first time seeing this image fail
    if (attempt === 0) {
      target.setAttribute('data-original-src', originalSrc);
    }

    // Clean up Weebly's URL query strings (like '?1778...') to keep filenames clean
    var cleanSrc = originalSrc.split('?')[0];
    var urlParts = cleanSrc.match(/(.*)\.([a-zA-Z0-9]+)$/);

    if (urlParts && urlParts.length === 3) {
      var basePath = urlParts[1]; // e.g., "uploads/1/4/2/1/142179781/cust25042026"
      var extension = urlParts[2]; // e.g., "jpeg" or "jpg"
      var newSrc = '';

      if (attempt === 0) {
        // First fallback: Try appending '_orig'
        newSrc = basePath + '_orig.' + extension;
        target.setAttribute('data-retry-attempt', '1');
      } else if (attempt === 1) {
        // Second fallback: Try appending '_1'
        newSrc = basePath + '_1.' + extension;
        target.setAttribute('data-retry-attempt', '2');
      } else if (attempt === 2) {
        // Third fallback: Try appending '_2'
        newSrc = basePath + '_2.' + extension;
        target.setAttribute('data-retry-attempt', '3');
      }

      if (newSrc) {
        // Set the new source to trigger a reload attempt
        target.src = newSrc;
      }
    }
  }
}, true); // The 'true' flag is critical to capture errors flowing up the DOM tree


document.addEventListener("submit", function (event) {
  // Find the search form (adjust selectors if your form has a specific class or ID)
  var searchForm = event.target.closest('form[action*="/apps/search"]');
  if (searchForm) {
    event.preventDefault(); // Stop it from going to Weebly's 404 URL

    // Find the input field inside this form
    var input = searchForm.querySelector('input[name="q"]') || searchForm.querySelector('input[type="search"]') || searchForm.querySelector('input[type="text"]');
    if (input && input.value.trim() !== "") {
      // Redirect to your new local search page with the query
      window.location.href = "search.html?q=" + encodeURIComponent(input.value.trim());
    }
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf('/') + 1);

  const leftForm = document.querySelector("#myarrow form:first-of-type");
  const leftButton = document.getElementById("submitinfo");
  const rightForm = document.querySelector("#myarrow form:last-of-type");

  const match = filename.match(/(customersgallery|laptoprecond|newlaptop)(\d*)\.html/);

  if (match) {
    const baseName = match[1]; // e.g., "customersgallery"
    const currentNumStr = match[2]; // e.g., "1", "2", or ""

    // Fetch the highest existing page number dynamically
    const highestNum = await findHighestNumberFast();

    if (currentNumStr === "") {
      // Unnumbered page is the first page
      // Inverted logic: Left (Prev) is disabled, Right (Next) goes to the highest number
      leftButton.disabled = true;
      leftForm.removeAttribute("action");
      
      if (highestNum > 0) {
        rightForm.setAttribute("action", `${baseName}${highestNum}.html`);
      } else {
        rightForm.setAttribute("action", "#");
      }
    } else {
      const currentNum = parseInt(currentNumStr, 10);
      leftButton.disabled = false;

      // Previous page: Add 1 to current number
      // If it exceeds the highest number, disable it or point to a safe boundary
      if (currentNum >= highestNum) {
        leftForm.setAttribute("action", `${baseName}${highestNum}.html`); 
      } else {
        leftForm.setAttribute("action", `${baseName}${currentNum + 1}.html`);
      }

      // Next page: Minus 1 from current number
      // If it reaches 1, the next step backward is the unnumbered base page
      if (currentNum === 1) {
        rightForm.setAttribute("action", `${baseName}.html`);
      } else if (currentNum > 1) {
        rightForm.setAttribute("action", `${baseName}${currentNum - 1}.html`);
      }
    }
  }
});

async function checkBatch(start, batchSize) {
    const promises = [];
    for (let i = 0; i < batchSize; i++) {
        const num = start + i;
        promises.push(
            fetch(`customersgallery${num}.html`, { method: 'HEAD' })
                .then(res => ({ num, ok: res.ok }))
                .catch(() => ({ num, ok: false }))
        );
    }
    return Promise.all(promises);
}

async function findHighestNumberFast() {
    let currentStart = 1;
    let batchSize = 20; 
    let highestNum = 0;
    let keepChecking = true;

    while (keepChecking) {
        const results = await checkBatch(currentStart, batchSize);
        
        const successful = results.filter(r => r.ok).map(r => r.num);
        
        if (successful.length > 0) {
            highestNum = Math.max(...successful);
        }
        
        if (successful.length < batchSize) {
            keepChecking = false;
        } else {
            currentStart += batchSize; 
        }
    }

    console.log('Highest number found:', highestNum);
    return highestNum;
}