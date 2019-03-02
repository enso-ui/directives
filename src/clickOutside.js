export default {
    bind: (el, binding, vNode) => {
        if (typeof binding.value !== 'function') {
            const compName = vNode.context.name;
            let warn = `[Vue-click-outside:] provided expression '${binding.expression}' must be a function`;

            warn += compName
                ? `Found in component '${compName}'`
                : null;

            console.warn(warn);
        }

        const bubble = binding.modifiers.bubble;

        el.clickOutsideHandler = (e) => {
            if (bubble || (!el.contains(e.target) && el !== e.target)) {
                binding.value(e);
            }
        }

        document.addEventListener('click', el.clickOutsideHandler);
    },

    unbind: (el) => {
        document.removeEventListener('click', el.clickOutsideHandler);
        el.clickOutsideHandler = null;
    }
};

