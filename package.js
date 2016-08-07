Package.describe({
  name: "utilities:react-list-container",
  summary: "List container for React",
  version: "0.1.13",
  git: "https://github.com/meteor-utilities/react-list-container.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'mongo',
    'ecmascript@0.4.2',
    'modules@0.5.2',
    'react-meteor-data@0.2.6-beta.16',
    'tmeasday:check-npm-versions@0.1.1',
    'meteorhacks:subs-manager@1.6.4'
  ]);

  api.use([
    'tmeasday:publish-counts@0.7.3',
  ], {weak: true});
  
  api.mainModule("lib/export.js", "server");
  api.mainModule("lib/export.js", "client");

  api.export([
    "CursorCounts"
  ]);

});
