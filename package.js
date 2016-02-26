Package.describe({
  name: "utilities:react-list-container",
  summary: "List container for React",
  version: "0.1.0",
  git: "https://github.com/meteor-utilities/react-list-container.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");
  
  api.use([
    'react',
    'modules',
    'ecmascript'
  ]);

  api.mainModule("lib/export.js", ["client", "server"]);

});
