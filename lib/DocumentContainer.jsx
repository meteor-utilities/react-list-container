import React, { PropTypes, Component } from 'react';

const Subs = new SubsManager();

const DocumentContainer = React.createClass({

  mixins: [ReactMeteorData],
  
  getMeteorData() {

    // subscribe if necessary
    if (this.props.publication) {
      const subscribeFunction = this.props.cacheSubscription ? Subs.subscribe.bind(Subs) : Meteor.subscribe;
      const subscription = subscribeFunction(this.props.publication, this.props.terms);
    }

    const collection = this.props.collection;
    const document = collection.findOne(this.props.selector);

    // look for any specified joins
    if (document && this.props.joins) {

      // loop over each join
      this.props.joins.forEach(join => {

        if (join.foreignProperty) {
          // foreign join (e.g. comments belonging to a post)

          // get the property containing the id
          const foreignProperty = document[join.foreignProperty];
          const joinSelector = {};
          joinSelector[join.foreignProperty] = document._id;
          document[join.joinAs] = collection.find(joinSelector);

        } else {
          // local join (e.g. a post's upvoters)

          // get the property containing the id or ids
          const joinProperty = document[join.localProperty];
          const collection = typeof join.collection === "function" ? join.collection() : join.collection;

          // perform the join
          if (Array.isArray(joinProperty)) { // join property is an array of ids
            document[join.joinAs] = collection.find({_id: {$in: joinProperty}}).fetch();
          } else { // join property is a single id
            document[join.joinAs] = collection.findOne({_id: joinProperty});
          }
        }

      });

    }

    const data = {
      currentUser: Meteor.user()
    }

    data[this.props.documentPropName] = document;

    return data;
  },

  render() {
    const loadingComponent = this.props.loading ? this.props.loading : <p>Loading…</p>

    if (this.data[this.props.documentPropName]) {
      if (this.props.component) {
        const Component = this.props.component;
        return <Component {...this.props.componentProps} {...this.data} collection={this.props.collection} />;
      } else {
        return React.cloneElement(this.props.children, { ...this.props.componentProps, ...this.data, collection: this.props.collection });
      }
    } else {
      return loadingComponent;
    }
  }

});


DocumentContainer.propTypes = {
  collection: React.PropTypes.object.isRequired,
  selector: React.PropTypes.object.isRequired,
  publication: React.PropTypes.string,
  terms: React.PropTypes.any,
  joins: React.PropTypes.array,
  loading: React.PropTypes.func,
  component: React.PropTypes.func,
  componentProps: React.PropTypes.object,
  documentPropName: React.PropTypes.string,
  cacheSubscription: React.PropTypes.bool
}

DocumentContainer.defaultProps = {
  documentPropName: "document",
  cacheSubscription: false
}


export default DocumentContainer;