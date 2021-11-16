export default {
    mounted: (el, binding, vNode) => binding.instance.$nextTick(() => el.focus()),
};
