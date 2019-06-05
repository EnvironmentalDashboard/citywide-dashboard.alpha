export const glyph = state => {
  return {
    render: driver => {
      if (!state.graphic) {
        return;
      }

      driver.handleRender(state);
    }
  };
};
