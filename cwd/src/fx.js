export const fx = function(animations) {
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
};