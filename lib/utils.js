const Utils = {};

// adapted from http://stackoverflow.com/a/22072374/649299
Utils.unflatten = function( array, idProperty, parentIdProperty, parent, tree ){

  tree = typeof tree !== "undefined" ? tree : [];

  let children = [];

  if (typeof parent === "undefined") {
    // if there is no parent, we're at the root level
    // so we return all root nodes (i.e. nodes with no parent)
    children = _.filter( array, node => !node[parentIdProperty]);
  } else {
    // if there *is* a parent, we return all its child nodes
    // (i.e. nodes whose parentId is equal to the parent's id.)
    children = _.filter( array, node => node[parentIdProperty] === parent[idProperty]);
  }

  // if we found children, we keep on iterating
  if (!!children.length) {

    if (typeof parent === "undefined") {
      // if we're at the root, then the tree consist of all root nodes
      tree = children;
    } else {
      // else, we add the children to the parent as the "childrenResults" property
      parent.childrenResults = children;
    }

    // we call the function on each child
    children.forEach(child => {
      Utils.unflatten(array, idProperty, parentIdProperty, child);
    });
  }

  return tree;
}

export default Utils;