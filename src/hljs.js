import hljs from 'highlight.js';

export default {
    beforeMount: el => hljs.highlightBlock(el.querySelector('code')),
    updated: el => hljs.highlightBlock(el.querySelector('code')),
};
