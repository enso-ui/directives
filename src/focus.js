export default {
    mounted: (el, binding) => binding.instance.$nextTick(() => el.focus()),
};
