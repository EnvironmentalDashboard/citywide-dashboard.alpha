/**
   * Creates an appropriate factory function from a database object that,
   * when executed, produces a glyph object that can be added into the
   * rendering engine.
   * @param {glyph} glyph The database object from which to make an appropriate factory function.
   */
  export const factory = (glyph, eventsDict, API_URL) => {
    const producePath = obj => {
      let state = obj.state || { graphic: {}, style: {} };

      if (obj.pathId) {
        return Object.assign(
          state,
          cwd.graphic(state).shape(cwd.pathShape().from(obj.pathId))
        );
      } else {
        return Object.assign(
          state,
          cwd.graphic(state).shape(cwd.pathShape().coords(obj.coords || ''))
        );
      }
    };

    return function() {
      // Set up variables
      let state = glyph.state;
      state._id = glyph._id;

      /**
       * If our glyph includes cached data, we will load this data into the object.
       * Then, we will possibly query the provided data url and override this cached
       * data.
       * This allows us to have the cached data in case anything goes wrong in the query.
       */
      if (glyph.data) {
        state.data = glyph.data;
      }

      if (glyph.data_url) {
        fetch(glyph.data_url)
        .then(r => r.json())
        .then(j => {
          state.data = j;

          // Update the glyph's data itself.
          // Consideration: maybe the factory shouldn't modify the provided glyph?
          glyph.data = j;

          // Then make call to store the new data into the database.
          fetch(`${API_URL}/glyphs/${glyph._id}/cache`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              // data is expected to be a JSON string
              data: JSON.stringify(j)
            })
          })
          .then(response => response.json())
          .then(j => console.log(j));
        });
      }

      let product = state;

      // Glyph first
      glyph.props.preventEdits
        ? Object.assign(product, cwd.glyph(state).preventEdits())
        : Object.assign(product, cwd.glyph(state));

      let shape;
      // Then graphic
      switch (glyph.shape) {
        case 'svg':
          shape = cwd
            .svgShape()
            .url(glyph.url || '')
            .size(glyph.props.size || '100%')
            .content(glyph.state.graphic.svgContent);
          break;

        case 'svgImage':
          shape = cwd
            .svgImageShape()
            .url(glyph.url || '')
            .size(glyph.props.size || '100%');
          break;

        default:
          shape = cwd
            .svgShape()
            .url(glyph.url || '')
            .size(glyph.props.size || '100%');
          break;
      }

      Object.assign(
        product,
        cwd
          .graphic(state)
          .shape(shape)
          .props(glyph.props)
      );

      // Then events
      const events = [];
      if (glyph.props.clickEffect && eventsDict[glyph.props.clickEffect]) events.push(eventsDict[glyph.props.clickEffect](glyph));
      Object.assign(product, cwd.events(state).addEvents(events));

      // Then fx
      const fxArray = [];
      for (let animatorType in glyph.animators) {
        const animator = glyph.animators[animatorType];
        switch (animatorType) {
          case 'frameChanger':
            const frameShapes = [];
            for (let frameURL of animator.frames) {
              frameShapes.push(
                cwd
                  .svgImageShape()
                  .url(frameURL)
                  .size(glyph.props.size || '100%')
              );
            }
            fxArray.push(
              cwd
                .frameChanger(state)
                .duration(animator.duration)
                .frames(frameShapes)
            );
            break;
          case 'pathMover':
            // We will force users to have a minimum duration of half of a second, as
            // slower than that starts getting a bit weird.
            const MIN_DURATION = 500;
            const animationDur = animator.maxDuration ? (
              glyph.data ? ((100 - glyph.data) / 100) * animator.maxDuration + MIN_DURATION : animator.maxDuration
            ) : animator.duration;
            const path = producePath(animator.path);

            fxArray.push(
              cwd
                .pathMover(state)
                .duration(animationDur)
                .path(path)
                .toSVGGroup(animator.group ? animator.group : null)
            );
          default:
            break;
        }
        Object.assign(product, cwd.fx(fxArray));
      }

      // Then return the whole thing
      return product;
    };
  };
