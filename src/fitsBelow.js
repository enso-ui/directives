export default {
    mounted: (el, binding) => {
        if (typeof binding.value !== 'function') {
            const { name } = binding.instance;
            let warn = `[v-open-beneath:] provided expression must be a function`;
            warn += name ? `Found in component '${name}'` : '';
            console.warn(warn);

            return;
        }

        const bounding = el.getBoundingClientRect();

        const state = bounding.top >= 0 && bounding.bottom
            <= (window.innerHeight || document.documentElement.clientHeight);

        binding.value(state);
    },

    unmounted: (el, binding) => binding.value(true),
};
