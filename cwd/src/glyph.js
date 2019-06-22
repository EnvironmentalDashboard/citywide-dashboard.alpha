export const glyph = state => {
  return {
    render: driver => {
      if (!state.graphic) {
        return;
      }

      driver.handleRender(state);
    },

    preventEdits: function() {
      state.notMoveable = true;

      return this;
    }
  };
};
