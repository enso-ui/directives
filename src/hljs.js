let hljsPromise;

const highlight = async el => {
    if (!hljsPromise) {
        hljsPromise = import('highlight.js')
            .then(module => module.default ?? module);
    }

    const code = el.querySelector('code');

    if (code) {
        (await hljsPromise).highlightElement(code);
    }
};

export default {
    mounted: highlight,
    updated: highlight,
};
