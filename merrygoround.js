$(function () {
  // TODO: make this a param
  var sitesUrl = "sites.json";
  var timing = 15000;

  var sites = [],
    currentSite = 0;

  var rotateSite = function () {
    $("iframe#site-" + currentSite).hide();

    if (currentSite + 1 < sites.length) currentSite++;
    else currentSite = 0;

    $("iframe#site-" + currentSite).show();
    setTimeout(rotateSite, timing);
  };

  $.ajax(sitesUrl, {
    dataType: "json",
    success: function (data) {
      sites = data.sites;
      data.sites.forEach(function (s, i) {
        $("body").append(
          "<iframe id='site-" +
            i +
            "' frameborder='0' class='site' src='" +
            s.url +
            "'></iframe>"
        );
      });
      setTimeout(rotateSite, timing);
    },
    error: function (err) {
      $("body").html("Error loading sites json file from:  " + sitesUrl);
    },
  });
});
