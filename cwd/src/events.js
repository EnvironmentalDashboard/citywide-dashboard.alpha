export const events = function(state) {
  let needsRedraw = true,
    events = [];

  return {
    events: evts => {
      events = evts;

      return this;
    }
  };
};
