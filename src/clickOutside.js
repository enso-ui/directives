const propertyValue = elem => window.getComputedStyle(elem)
    .getPropertyValue('z-index');

const zIndex = elem => elem === null
    ? 0
    : (parseInt(propertyValue(elem), 10) || zIndex(elem.parentElement));

const intersect = (container, target) => {
    const containerRect = target.getClientRects()[0] || {};
    const targetRect = container.getClientRects()[0] || {};

    return !(targetRect.right < containerRect.left
        || targetRect.bottom < containerRect.top
        || containerRect.bottom < targetRect.top
        || containerRect.right < targetRect.left);
};

const inside = (container, target) => {
    if (target === null) {
        return false;
    }

    const isInside = container === target
        || container.contains(target)
        || !target.contains(container)
        && intersect(container, target)
        && zIndex(target) >= zIndex(container);

    const isInsideOfDescendant = () => Array.from(container.children)
        .reduce((isInside, elem) => isInside || inside(elem, target), false)

    return isInside
        || isInsideOfDescendant()
        || inside(container, target.parentElement);
};

export default {
    beforeMount: (el, binding) => {
        if (typeof binding.value !== 'function') {
            const { name } = binding.instance;
            let warn = '[v-click-outside:] provided expression must be a function';
            warn += name ? `Found in component '${name}'` : '';
            console.warn(warn);

            return;
        }

        el.clickOutsideHandler = e => {
            if (!inside(el, e.target)) {
                binding.value(e);
            }
        };

        document.addEventListener('click', el.clickOutsideHandler);
    },

    unmounted: el => {
        document.removeEventListener('click', el.clickOutsideHandler);
        el.clickOutsideHandler = null;
    },
};
