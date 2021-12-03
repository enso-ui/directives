export default {
    beforeMount: (el, binding) => {
        const { name } = binding.instance;
        let warn = null;

        if (typeof binding.value !== 'function') {
            warn = `[v-long-click:] provided expression '${binding.expression}' must be a function`;
            warn += name ? `Found in component '${name}'` : '';
            console.warn(warn);

            return;
        }

        if (`${parseInt(binding.arg, 10)}` !== binding.arg) {
            warn = `[v-long-click:] provided argument '${binding.arg}' must be a number`;
            warn += name ? `Found in component '${name}'` : '';
            console.warn(warn);

            return;
        }

        let timer = null;
        const duration = parseInt(binding.arg, 10);

        el.longClickStartHandler = (e) => {
            if (e.button === 0 && timer === null) {
                timer = setTimeout(binding.value, duration);
            }
        };

        el.longClickEndHandler = (e) => {
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
            }
        };

        el.addEventListener('mousedown', el.longClickStartHandler);
        el.addEventListener('touchstart', el.longClickStartHandler);

        el.addEventListener('click', el.longClickEndHandler);
        el.addEventListener('mouseout', el.longClickEndHandler);
        el.addEventListener('touchend', el.longClickEndHandler);
        el.addEventListener('touchcancel', el.longClickEndHandler);
    },

    unmounted: (el) => {
        el.removeEventListener('mousedown', el.longClickStartHandler);
        el.removeEventListener('touchstart', el.longClickStartHandler);

        el.removeEventListener('click', el.longClickEndHandler);
        el.removeEventListener('mouseout', el.longClickEndHandler);
        el.removeEventListener('touchend', el.longClickEndHandler);
        el.removeEventListener('touchcancel', el.longClickEndHandler);
        el.longClickStartHandler = null;
        el.longClickEndHandler = null;
    },
};
