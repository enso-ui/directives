export default {
    inserted: (el, binding, vNode) => {
        vNode.context.$nextTick(el.focus);
        el.focus();
    },
};
