const zIndex = elem => {
    if (elem === null) {
        return 0;
    }

    return parseInt(window.getComputedStyle(elem).getPropertyValue('z-index'), 10)
        || zIndex(elem.parentElement);
};

const isNext = (first, second) => first.compareDocumentPosition(second) & 0x04;

const isAbove = (below, top) => zIndex(top) === zIndex(below) && isNext(below, top)
        || zIndex(top) > zIndex(below);

const collision = (element, target) => {
    const targetRect = element.getClientRects()[0] || {};
    const elementRect = target.getClientRects()[0] || {};

    const separate = targetRect.right < elementRect.left
        || targetRect.bottom < elementRect.top
        || elementRect.bottom < targetRect.top
        || elementRect.right < targetRect.left;

    return !separate;
};

const contained = (container, target) => {
    if (target.contains(container)) {
        return false;
    }

    if (collision(container, target) && isAbove(container, target)) {
        return true;
    }

    return Array.from(container.children)
        .reduce((result, elem) => result || contained(elem, target), false);
};

const deepContained = (container, target) => {
    if (target === null) {
        return false;
    }

    return contained(container, target)
        || deepContained(container, target.parentElement);
};

const inside = (container, target) => container === target || container.contains(target)
        || deepContained(container, target);

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
