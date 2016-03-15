Package.describe({
  name: "utilities:react-list-container",
  summary: "List container for React",
  version: "0.1.3",
  git: "https://github.com/meteor-utilities/react-list-container.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.3-beta.11");
  
  api.use([
    'react@0.14.3_1',
    'modules',
    'ecmascript',
    'jsx@0.2.4',
    'tmeasday:publish-counts@0.7.3'
  ]);

  api.mainModule("lib/export.js", ["client", "server"]);

});
