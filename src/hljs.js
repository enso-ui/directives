import hljs from 'highlight.js';

export default {
    bind: el => hljs.highlightBlock(el.querySelector('code')),
    componentUpdated: el => hljs.highlightBlock(el.querySelector('code')),
};
