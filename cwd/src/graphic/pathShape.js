export const pathShape = () => {
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