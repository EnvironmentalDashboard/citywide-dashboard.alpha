export const events = function(state) {
  // let needsRedraw = true,
    // events = [];

  return {
    addEvents: function(evts) {
      state.eventsArr = evts;

      return this;
    }
  };
};
