export const glyph = (state) => {
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