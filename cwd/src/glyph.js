export const glyph = state => {
  return {
    render: async driver => {
      if (!state.graphic) {
        return;
      }

      await driver.handleRender(state);
    },

    preventEdits: function() {
      state.notMoveable = true;

      return this;
    }
  };
};
