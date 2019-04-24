// @author Jeremy Feinstein
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = global || self, factory(global.cwd = global.cwd || {}));
}(this, function (exports) { 'use strict';

var glyph = (state) => {
    return {
        render: (driver) => {
            if(!state.graphic) {
                return ;
            }

            driver.handleRender(state);
            
            /*if(!state.hasOwnProperty('$link')) {
                state.$link = driver.register(state.graphic);
            }

            driver.update(state.$link, state.graphic);*/
        }
    };
};

var graphic = (state) => {
    state.graphic = {
        type: null,
        url: null
    };

    return {
        shape: function(shape) {
            state.graphic = shape.graphic();

            return this;
        }
    };
};

var pathShape = () => {
    let graphic = {
        type: 'path',
        coords: null
    };

    return {
        coords: function(path) {
            graphic.coords = path;

            return this;
        },

        graphic: function() {
            return graphic;
        }
    };
};

var svgImageShape = () => {
    let graphic = {
        type: 'svgImage',
        url: null
    };

    return {
        url: function(url) {
            graphic.url = url;

            return this;
        },

        graphic: function() {
            return graphic;
        }
    };
};

function fx(animations) {
    let needsRedraw = true;

    return {
        isAnimated: true,
        needsRedraw: () => {
            return needsRedraw;
        },
        
        step: (timestamp) => {
            animations.forEach(function(animator) {
                if(animator.readyToStep(timestamp)) {
                    animator.step(timestamp);

                    needsRedraw = true;
                }
            });
        }
    };
}

var frameChanger = (state) => {
    let current = 0;
    let increment = 1;

    let frames = [];
    let duration = 5000;

    let lastStepped = 0;
    let stepEvery = 1;

    function nextFrame() {
        current = current + increment;

        if((current + increment) >= frames.length || (current + increment) < 0) {
            increment *= -1;
        }
    }

    return {
        duration: function(dur) {
            duration = dur;
            stepEvery = duration / (frames.length * 2);

            return this;
        },

        frames: function(arr) {
            frames = arr;
            stepEvery = duration / (frames.length * 2);

            return this;
        },

        step: function(timestamp) {
            nextFrame();
            lastStepped = timestamp;

            state.shape(frames[current]);
        },

        readyToStep: function(timestamp) {
            return timestamp - lastStepped >= stepEvery;
        }
    };
};

var pathMover = (state) => {
    let duration = 5000;

    let lastStepped = 0;
    let stepEvery = 1;

    let path = null;

    return {
        duration: function(dur) {
            duration = dur;

            return this;
        },

        path: function(shape) {
            path = shape;

            return this;
        },

        step: function(timestamp) {
            lastStepped = timestamp;

            let current = timestamp % duration;

            let lengthOnPath = (current / duration) * path.$link.getTotalLength();
    
            /**
             * @todo This may be leakly logic...
             */
            let point = path.$link.getPointAtLength(lengthOnPath);
    
            state.style = Object.assign(state.style, {
                transform: 'translate(' + point.x + 'px, ' + point.y + 'px)'
            });
        },

        readyToStep: function(timestamp) {
            return timestamp - lastStepped >= stepEvery;
        }
    };
};

var svgImageShapeDriver = () => {
    return {
        create: function(state) {
            let $image = document.createElementNS('http://www.w3.org/2000/svg', 'image');

            return $image;
        },

        update: function (state) {
            state.$link.setAttributeNS(
                'http://www.w3.org/1999/xlink',
                'xlink:href',
                state.graphic.url
            );

            state.$link.setAttribute('width', '400px');
            state.$link.setAttribute('height', '400px');

            for(var key in state.style) {
                state.$link.style[key] = state.style[key];
            }
        }
    };
};

var pathShapeDriver = () => {
    return {
        create: function(state) {
            let $image = document.createElementNS('http://www.w3.org/2000/svg', 'path');

            return $image;
        },

        update: function (state) {
            state.$link.setAttribute('d', state.graphic.coords);

            for(var key in state.style) {
                state.$link.style[key] = state.style[key];
            }
        }
    };
};

var bridge = ($svg) => {

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

        return $svg.appendChild(state.$link);
    };

    let update = (state) => {
        strategyLookup(state.graphic.type).call().update(state);
    };

    return {
        url: (url) => {
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

/**
 * MapEngine ties together all drivers and map dependencies (e.g., gylphs) & keeps
 * track of them in a live map simulation.
 * 
 * At simulation instantiation, the MapEngine's `render()` method is triggered.
 * MapEngine is henceforth responsible for rendering all graphics, animations,
 * event dispatching, and so on.
 */

var mapEngine = (gfxDriver, animationsDriver) => {
    let glyphs = [];
    let animatedGlyphs = [];

    let drivers = {
        gfx: gfxDriver,
        animations: animationsDriver
    };

    return {
        /**
         * Runs every glyph's `render()` method with the graphics driver and sequences
         * animations
         */
        render: function() {
            // Iterate through every glyph and render
            glyphs.forEach(function(glyph) {
                glyph.render(drivers.gfx);

                // Animated glyphs must be tracked more frequently
                if(glyph.isAnimated) {
                    animatedGlyphs.push(glyph);
                }
            });

            // Assign `MapEngine.renderAnimations` to the animations driver
            drivers.animations(this.renderAnimations);
        },

        /**
         * Runs every animation's `step()` method and redraws out-of-date Glyphs.
         * 
         * @param {int} timestamp 
         */
        renderAnimations: function renderAnimations(timestamp) {
            // Iterate through every animated glyph and step
            animatedGlyphs.forEach(function(animatedGlyph) {
                animatedGlyph.step(timestamp);
    
                // Re-render glyphs that request it
                if(animatedGlyph.needsRedraw()) {
                    animatedGlyph.render(drivers.gfx);
                }
            });

            // Assign `MapEngine.renderAnimations` to the animations driver
            drivers.animations(renderAnimations);
        },

        addGlyph: (glyph) => {
            glyphs.push(glyph);
        }
    }
};

exports.glyph = glyph;
exports.graphic = graphic;
exports.pathShape = pathShape;
exports.svgImageShape = svgImageShape;
exports.fx = fx;
exports.frameChanger = frameChanger;
exports.pathMover = pathMover;
exports.svgDriver = bridge;
exports.engine = mapEngine;

Object.defineProperty(exports, '__esModule', { value: true });

}));
