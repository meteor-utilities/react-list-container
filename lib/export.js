import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions({
  'react': '^0.14.6'
});

import ListContainer from "./ListContainer.jsx";
import DocumentContainer from "./DocumentContainer.jsx";

export default {ListContainer, DocumentContainer};