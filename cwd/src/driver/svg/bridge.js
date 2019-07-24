import { svgImageShapeDriver } from './graphic/svgImageShapeDriver';
import { pathShapeDriver } from './graphic/pathShapeDriver';
import { svgGradientDriver } from './graphic/svgGradientDriver';
import { svgShapeDriver } from "./graphic/svgShapeDriver";

export const bridge = $svg => {
  let graphic = {};

  const elementDictionary = {
    svgImage: svgImageShapeDriver,
    path: pathShapeDriver,
    linearGradient: svgGradientDriver,
    svg: svgShapeDriver
  };

  let strategyLookup = key => {
    if (elementDictionary.hasOwnProperty(key)) {
      return elementDictionary[key];
    }

    return;
  };

  let register = async state => {
    if (state.graphic.type == null) {
      return;
    }

    state.$link = await strategyLookup(state.graphic.type)
      .call()
      .create(state.graphic);
    if (state.path) {
      state.path.$link = strategyLookup(state.path.graphic.type)
        .call()
        .create(state.path.graphic);
    }
    // event driver
    if (state.eventsArr !== undefined) {
      state.eventsArr.forEach(event => {
        state.$link.addEventListener(event.type, event.listener);
      });
    }

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

    handleRender: async state => {
      if (!state.hasOwnProperty('$link')) {
        if (state.hasRegistered) {
          return;
        }
        state.hasRegistered = true;
        await register(state)
        update(state)
      } else {
        update(state);
      }
    }
  };
};
