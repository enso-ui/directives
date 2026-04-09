import * as hljsModule from 'highlight.js';

const hljs = hljsModule.default ?? hljsModule;

export default {
    beforeMount: el => hljs.highlightElement(el.querySelector('code')),
    updated: el => hljs.highlightElement(el.querySelector('code')),
};
