export default {
    inserted: (el, binding, vNode) => {
        if (typeof binding.value === 'undefined' || binding.value) {
            vNode.context.$nextTick(() => el.focus());
        }
    },
};
