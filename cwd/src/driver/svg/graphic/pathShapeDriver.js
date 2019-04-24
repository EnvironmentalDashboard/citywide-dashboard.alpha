export const pathShapeDriver = () => {
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
}