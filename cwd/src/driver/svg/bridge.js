import {svgImageShapeDriver} from "./graphic/svgImageShapeDriver";
import {pathShapeDriver} from "./graphic/pathShapeDriver";

export const bridge = ($svg) => {
    let graphic = {};

    const elementDictionary = {
        'svgImage': svgImageShapeDriver,
        'path': pathShapeDriver
    };

    let strategyLookup = (key) => {
        if(elementDictionary.hasOwnProperty(key)) {
            return elementDictionary[key];
        }

        return;
    };

    let register = (state) => {
        if(state.graphic.type == null) {
            return;
        }

        state.$link = strategyLookup(state.graphic.type).call().create(state.graphic);

        // event driver
        if (state.events !== undefined) {
            state.events.forEach((event) => {
                state.$link.addEventListener(
                    event.type,
                    event.listener
                );
            });
        }

        return $svg.appendChild(state.$link);
    };

    let update = (state) => {
        strategyLookup(state.graphic.type).call().update(state);
    };

    return {
        url: (url) => {
            graphic.url = url;
        },

        draw: (graphic, style) => {
            console.log('No driver');
        },

        handleRender: (state) => {
            if(!state.hasOwnProperty('$link')) {
                register(state);
            }

            update(state);
        }
    };
};