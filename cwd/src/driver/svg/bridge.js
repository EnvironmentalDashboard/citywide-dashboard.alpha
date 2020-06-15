import { svgImageShapeDriver } from './graphic/svgImageShapeDriver';
import { pathShapeDriver } from './graphic/pathShapeDriver';
import { svgShapeDriver } from './graphic/svgShapeDriver';

export const bridge = $svg => {
  let graphic = {};

  const elementDictionary = {
    buttonText: buttonTextDriver,
    svgImage: svgImageShapeDriver,
    path: pathShapeDriver,
    svg: svgShapeDriver
  };

  let strategyLookup = key => {
    if (elementDictionary.hasOwnProperty(key)) {
      return elementDictionary[key];
    }

    return;
  };

  let register = state => {
    if (state.graphic.type == null) {
      return;
    }

    state.$link = strategyLookup(state.graphic.type)
      .call()
      .create(state.graphic);
    if (state.path) {
      state.path.$link = strategyLookup(state.path.graphic.type)
        .call()
        .create(state.path.graphic);
    }

    if (state.id) {
      state.$link.setAttribute('id', state.id);
    }

    // event driver
    if (state.eventsArr !== undefined) {
      state.eventsArr.forEach(event => {
        state.$link.addEventListener(event.type, event.listener);
      });
    }

    // important! this is where we are adding to the svg-wrap
    //
    return $svg.appendChild(state.$link);
  };

  let update = state => {
    strategyLookup(state.graphic.type)
      .call()
      .update(state);
    if (state.path) {
      strategyLookup(state.path.graphic.type)
        .call()
        .update(state.path);
    }
  };

  return {
    url: url => {
      graphic.url = url;
    },

    draw: (graphic, style) => {
      console.log('No driver');
    },

    handleRender: state => {
      if (!state.hasOwnProperty('$link')) {
        register(state);
        update(state);
      } else {
        update(state);
      }
    }
  };
};
