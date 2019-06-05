(function(cwd) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('width', '500px');
    svg.setAttribute('height', '500px');

    document.getElementById('map').appendChild(svg);

    let animationDriver = window.requestAnimationFrame.bind(window);
    let graphicsDriver = cwd.svgDriver(svg);

    let dash = cwd.engine(graphicsDriver, animationDriver);

    const zigPath = () => {
        let state = {
            graphic: {},
            style: {}
        };

        return Object.assign(
            state,
            cwd.graphic(state).shape(
                cwd.pathShape().coords('M500,250 L400,240 L240,160 L160,40 L80,80 L-100,100')
            )
        );
    }

    const bird = (path) => {
        let frames = [
            cwd.svgImageShape().url('./images/bird/1.svg'),
            cwd.svgImageShape().url('./images/bird/2.svg'),
            cwd.svgImageShape().url('./images/bird/3.svg'),
            cwd.svgImageShape().url('./images/bird/4.svg')
        ];

        let state = {
            graphic: {},
            style: {}
        };

        return Object.assign(
            state,
            cwd.glyph(state),
            cwd.graphic(state).shape(frames[0]),
            cwd.fx([
                cwd.frameChanger(state).duration(1000).frames(frames),
                cwd.pathMover(state).duration(3000).path(path)
                    
            ])
        );
    };

    let tweetPath = zigPath();
    let tweet = bird(tweetPath);

    dash.addGlyph(tweet);
    dash.render();
})(window.cwd);