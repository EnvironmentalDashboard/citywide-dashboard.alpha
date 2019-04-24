export const svgImageShape = () => {
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