var tabs        = require("tabs");
var self        = require("self");
var pageMod     = require("page-mod");

pageMod.PageMod({
  include: '*',
  contentScriptFile: [
    self.data.url("jquery.js"),
    self.data.url("extensio-with-minitest.js"),
    self.data.url("firefox-all-tests.js")
  ]
});

tabs.open({
  url: 'http://localhost:7890/'
});