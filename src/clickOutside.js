import Vue from 'vue';

Vue.directive('click-outside', {
    bind: (el, binding, vNode) => {
        if (typeof binding.value !== 'function') {
            const compName = vNode.context.name;
            let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
            if (compName) { warn += `Found in component '${compName}'` };
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
})
