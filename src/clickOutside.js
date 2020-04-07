export default {
    bind: (el, binding, vNode) => {
        if (typeof binding.value !== 'function') {
            const { name } = vNode.context;
            let warn = `[v-click-outside:] provided expression '${binding.expression}' must be a function`;
            warn += name ? `Found in component '${name}'` : '';
            console.warn(warn);
        }

        el.clickOutsideHandler = (e) => {
            if (!el.contains(e.target) && el !== e.target) {
                binding.value(e);
            }
        };

        document.addEventListener('click', el.clickOutsideHandler);
    },

    unbind: (el) => {
        document.removeEventListener('click', el.clickOutsideHandler);
        el.clickOutsideHandler = null;
    },
};
