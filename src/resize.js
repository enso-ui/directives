let min;

const resizeInput = el => {
    el.style.width = 0;
    const width = el.scrollWidth > min ? el.scrollWidth + 4 : min;
    el.style.width = `${width}px`;
};

const handler = event => resizeInput(event.target);

export default {
    mounted: (el, binding) => {
        const { name } = binding.instance;

        if (binding.arg && `${parseInt(binding.arg, 10)}` !== binding.arg) {
            let warn = `[v-resize:] provided argument '${binding.arg}' must be a number`;
            warn += name ? `Found in component '${name}'` : '';
            console.warn(warn);

            return;
        }

        min = binding.arg ? parseInt(binding.arg, 10) : 10;

        resizeInput(el);
        el.addEventListener('input', handler);
    },
    unmounted: el => el.removeEventListener('input', handler),
};
