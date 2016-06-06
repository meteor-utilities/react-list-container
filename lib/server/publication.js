import CursorCounts from '../counts.js';

Meteor.publish('cursorcounts', function() {
  const self = this;
  CursorCounts.subscription = self;
  self.ready();
});