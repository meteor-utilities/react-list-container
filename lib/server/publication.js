import CursorCounts from '../counts.js';

Meteor.publish('cursorcounts', function() {
  const self = this;
  CursorCounts.setSubscription(self);
  self.ready();
});