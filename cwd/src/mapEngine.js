/**
 * MapEngine ties together all drivers and map dependencies (e.g., glyphs) & keeps
 * track of them in a live map simulation.
 *
 * At simulation instantiation, the MapEngine's `render()` method is triggered.
 * MapEngine is henceforth responsible for rendering all graphics, animations,
 * event dispatching, and so on.
 */

export const engine = (gfxDriver, animationsDriver) => {
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
      
      // Assign `MapEngine.renderAnimations` to the animations driver
      drivers.animations(this.renderAnimations);

      // Iterate through every glyph and render
      for (let glyph of glyphs) {
        glyph.render(drivers.gfx);

        // Animated glyphs must be tracked more frequently
        if (glyph.isAnimated) {
          animatedGlyphs.push(glyph);
        }
      }
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
        if (animatedGlyph.needsRedraw()) {
          animatedGlyph.render(drivers.gfx);
        }
      });

      // Assign `MapEngine.renderAnimations` to the animations driver
      drivers.animations(renderAnimations);
    },

    addGlyph: glyph => {
      glyphs.push(glyph);
    },

    edit: function(driver) {
      glyphs.forEach(glyph => {
        if (!glyph.notMoveable) {
          glyph.$link.classList.add('draggable');
        }
        animatedGlyphs = [];
      });

      const draggables = Array.from(
        document.getElementsByClassName('draggable')
      );
      draggables.forEach(draggable => {
        draggable.addEventListener('load', driver);
      });
    }
  };
};
