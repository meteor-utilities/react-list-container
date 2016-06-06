CursorCounts = {};

if (Meteor.isClient) {
  CursorCounts = new Mongo.Collection("cursorcounts");
  CursorCounts.get = function (terms) {
    // note: countDoc might initially not be found if subscription
    // data hasn't yet been loaded
    const cursorId = this.getCursorId(terms);
    const countDoc = CursorCounts.findOne(cursorId);
    return countDoc && countDoc.count;
  }
}

if (Meteor.isServer) {
  CursorCounts = {
    subscription: null,
    counts: [],
    push(terms, count) {
      const cursorId = this.getCursorId(terms);
      if (this.subscription) {
        this.subscription.added("cursorcounts", cursorId, {count: count});
      }
      this.counts[cursorId] = count;
    },
    get(terms) {
      const cursorId = this.getCursorId(terms);
      return this.counts[cursorId];
    }
  };
}

CursorCounts.getCursorId = (terms) => {
  terms = _.clone(terms);
  delete terms.currentUserId;
  return JSON.stringify(terms);
};

export default CursorCounts;

