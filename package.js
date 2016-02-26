Package.describe({
  name: "utilities:react-list-container",
  summary: "List container for React",
  version: "0.1.0",
  git: "https://github.com/meteor-utilities/react-list-container.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.3-beta.11");
  
  api.use([
    'react',
    'modules',
    'ecmascript',
    'jsx'
  ]);

  // use globals until Atmosphere supports 1.3

  // api.addFiles([
  //   'lib/ItemContainer.jsx',
  //   'lib/ListContainer.jsx'
  // ], ['client', 'server']);

  // api.export([
  //   'ItemContainer',
  //   'ListContainer'
  // ]);

  // not supported yet
  api.mainModule("lib/export.js", ["client", "server"]);

});
