export const svgImageShapeDriver = () => {
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
}