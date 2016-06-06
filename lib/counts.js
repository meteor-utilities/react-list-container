CursorCounts = {};

if (Meteor.isClient) {
  CursorCounts = new Mongo.Collection("cursorcounts");
  CursorCounts.get = function (listId) {
    const countDoc = CursorCounts.findOne(listId);
    return countDoc && countDoc.count;
  }
}

if (Meteor.isServer) {
  CursorCounts = {
    subscription: null,
    counts: [],
    setSubscription: function (subscription) {
      this.subscription = subscription;
    },
    push(listId, count, sessionId) {
      if (this.subscription) {
        this.subscription.added("cursorcounts", listId, {count: count, sessionId: sessionId});
      }
      if (sessionId) {
        if (!this.counts[sessionId]) {
          this.counts[sessionId] = {};
        }
        this.counts[sessionId][listId] = count;
      }
    },
    get(listId, sessionId) {
      if (this.counts[sessionId]) {
        return this.counts[sessionId][listId];
      }
    }
  };
}

export default CursorCounts;

