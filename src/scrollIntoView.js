const state = Symbol('scrollIntoView');

const run = (el, { block, inline, behavior }) => {
    el.scrollIntoView({ block, inline, behavior });
};

export default {
    mounted(el, { value }) {
        el[state] = value.scroll;

        if (value.scroll) {
            run(el, value);
        }
    },
    updated(el, { value }) {
        if (!el[state] && value.scroll) {
            run(el, value);
        }

        el[state] = value.scroll;
    },
    unmounted(el) {
        delete el[state];
    },
};
