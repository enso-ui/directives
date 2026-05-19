export default {
    mounted: (el, { instance, value = true }) => value
        && instance.$nextTick(() => el.focus()),
};
