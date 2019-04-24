export const pathMover = (state) => {
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

