const Handlebars = require('handlebars');

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['mainfeed__post'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<section>\r\n    <div class=\"post\">\r\n        <button><img src=\"https://res.cloudinary.com/dllfvjfoy/image/upload/f_auto,q_auto/v1/pfp/"
    + alias4(((helper = (helper = lookupProperty(helpers,"pfp_key") || (depth0 != null ? lookupProperty(depth0,"pfp_key") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pfp_key","hash":{},"data":data,"loc":{"start":{"line":3,"column":97},"end":{"line":3,"column":108}}}) : helper)))
    + "\" alt=\"author-pfp\" class=\"profile-crop\" name=\"populate-stats-hover-feed\"></button>\r\n    </div>\r\n    <div class=\"post content primary font\">\r\n        <div class=\"author\">\r\n            <h3 class=\"author-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":7,"column":36},"end":{"line":7,"column":48}}}) : helper)))
    + "</h3>\r\n            <h4 class=\"author-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"full_name") || (depth0 != null ? lookupProperty(depth0,"full_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"full_name","hash":{},"data":data,"loc":{"start":{"line":8,"column":36},"end":{"line":8,"column":49}}}) : helper)))
    + "</h4>\r\n        </div>\r\n        <div class=\"description\">\r\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":11,"column":15},"end":{"line":11,"column":30}}}) : helper)))
    + "</p>\r\n        </div>\r\n        <video loop src=\"https://res.cloudinary.com/dllfvjfoy/video/upload/"
    + alias4(((helper = (helper = lookupProperty(helpers,"video_id") || (depth0 != null ? lookupProperty(depth0,"video_id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"video_id","hash":{},"data":data,"loc":{"start":{"line":13,"column":75},"end":{"line":13,"column":87}}}) : helper)))
    + ".mp4\" width=\"400\"></video>\r\n    </div>\r\n</section>\r\n<hr class=\"solid\">\r\n\r\n<script src=\"./bundle.js\"></script>";
},"useData":true});
templates['profilepage'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<header>\r\n    <div class=\"prof-header primary font\">\r\n        <img src="
    + alias4(((helper = (helper = lookupProperty(helpers,"profPic") || (depth0 != null ? lookupProperty(depth0,"profPic") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profPic","hash":{},"data":data,"loc":{"start":{"line":3,"column":17},"end":{"line":3,"column":28}}}) : helper)))
    + " alt=\"author-pfp\" class=\"profile-crop\">\r\n        <div class=\"prof-header__container\">\r\n            <div class=\"container prof-header__top-buttons\">\r\n                <h3 class=\"author-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":6,"column":40},"end":{"line":6,"column":52}}}) : helper)))
    + "</h3>\r\n                <!--add button switch--><button class=\"button-alt\">Follow</button>\r\n            </div>\r\n            <div>\r\n                <h4 class=\"author-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"userFullName") || (depth0 != null ? lookupProperty(depth0,"userFullName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userFullName","hash":{},"data":data,"loc":{"start":{"line":10,"column":40},"end":{"line":10,"column":56}}}) : helper)))
    + "</h4>\r\n                <div class=\"description\">\r\n                    <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"userBio") || (depth0 != null ? lookupProperty(depth0,"userBio") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userBio","hash":{},"data":data,"loc":{"start":{"line":12,"column":23},"end":{"line":12,"column":34}}}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n        </div> \r\n    </div>\r\n</header>\r\n\r\n<main>\r\n    <div class=\"prof-feed\">\r\n        <div class=\"video-grid\" id=\"profPostContainer\">\r\n        </div>\r\n    </div>\r\n</main>\r\n\r\n<script src=\"./bundle.js\"></script>";
},"useData":true});
})();