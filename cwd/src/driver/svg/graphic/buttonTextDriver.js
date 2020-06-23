export const buttonTextDriver = () => {
  const defaultText  = "DEFAULT BUTTON TEXT";
  return {
    create: function(state) {
      let newDiv = document.createElement("div");
      let newContent = document.CreateTextNode(defaulText);
      newDiv.appendChild(newContent);

      return newDiv;
    },
    update: function(state) {
    state.$link.setAttribute('href', state.graphic.url);

    //sets the height and width of the text box to the left of the buttons
    if (state.graphic.width || state.graphic.height) {
      state.graphic.height
        ? state.$link.setAttribute('height', state.graphic.height)
        : null;
      state.graphic.width
        ? state.$link.setAttribute('width', state.graphic.width)
        : null;
    } else {
      state.$link.setAttribute('width', '100px');
      state.$link.setAttribute('height', '50px');
      }
      for (var key in state.style)
        state.$link.style = state.style[key];
    }
  };
};
