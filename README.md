# React List Container

A set of React container components (list & item) used to manage template-level subscriptions in Meteor apps. Supports client-side joins and nested trees.

### Install

`meteor add utilities:react-list-container`

### Usage

A *container* is a special React component that doesn't output any HTML. Instead, its whole job is to fetch data and pass it on as props to its child components. 

This package provides two containers that help you fetch data and pass it as props either for a paginated list of documents, or for a single document. 

You can import and use the containers with:

```js
import Containers from "meteor/utilities:react-list-container";

const ListContainer = Containers.ListContainer;
const ItemContainer = Containers.ItemContainer;

```

## List Container

### Usage

To use the list container, just wrap it around a child container:

```jsx
<ListContainer collection={Posts} publication="posts.list">
  <PostList/>
</ListContainer>
```

### Input

The list container accepts the following props:

#### Basic Props

##### `collection` (object) [required]

The Meteor collection in which to look for data.

##### `selector` (object)

The selector (as in `Collection.find(selector, options)`) used on the client to query for data. If not provided, will default to `{}`.

##### `options` (object)

The options used on the client to sort and limit data. If not provided, will default to `{}`.

##### `publication` (string)

Optionally, the name of a publication to which to subscribe to. If not provided, the container will assume the required data has already been published.

##### `terms` (object)

If a publication is provided, an object passed as argument to the publication when subscribing. If not provided, the container will subscribe without providing any arguments.

##### `limit` (number)

How many documents to initially query, as well as how much to increment the list by every time. Defaults to `10`.

#### Advanced Props

Additionally, the following advanced features are also available: 

##### `joins` (array)

An array of joins. Each join object has the following properties:

- `property` (string): the property in the current collection containing the join info.
- `collection` (object|function): the collection in which to look for the documents to join (or alternatively a function returning the collection).
- `joinAs` (string): the new property under which to store the result of the join.

The container makes the following assumptions:

- The `property` property contains either a single `_id`, or an array of `_id`s.
- The data required by the join is published by the `publication` publication, or else has already been published independently.

Example:

```js
joins = [
  {
    property: "userId",
    collection: Meteor.users,
    joinAs: "author"
  },
  {
    property: "categoriesId",
    collection: Categories,
    joinAs: "categories"
  }
]
```

##### `parentProperty` (string)

The name of a property storing the parent node's `_id` to use to “unflatted” the list of documents into a tree.

In the following example, you would pass `parentCommentId` as the `parentProperty`:

```js
[
  {
    _id: 1,
    title: "A comment"
  },
  {
    _id: 2,
    title: "Another comment"
  },
  {
    _id: 3,
    title: "A reply to the first comment",
    parentCommentId: 1
  }
]
```

Note: make sure to pass `0` as a limit to load all documents when using trees.

### Output

The list container passes on the following props:

##### `currentUser` (object)

The current Meteor user.

##### `results` (array)

The documents outputted by the list container.

##### `count` (number)

A count of the documents.

##### `totalCount` (number)

A count of the *total number of documents* matching the query *on the server*.

(Note: requires publishing a count with the same name as the publication using the [publish-counts](https://github.com/percolatestudio/publish-counts) package).

##### `hasMore` (boolean)

Whether there is more content to load or not. Also see above note about requiring the [publish-counts](https://github.com/percolatestudio/publish-counts) package.

##### `ready` (boolean)

Whether the subscription is ready (default to `true` if there is no subscription).

## Item Container

### Usage

Similarly to the list component, this container will pass props to any child component. But unlike the list container, it only works for single documents:

```jsx
<ItemContainer collection={Posts} selector={{_id: "xyz"}}>
  <Post/>
</ItemContainer>
```

### Input

The item container accepts the following props:

##### `collection` (object) [required]

See list container.

##### `selector` (object) [required]

See list container.

##### `publication` (string)

See list container.

##### `terms` (object)

See list container.

##### `joins` (array)

See list container.

##### `loading` (component)

A React component to display while the subscription is working.

### Output

The item container passes on the following props:

##### `currentUser`

The current Meteor user.

##### `document`

The document.
