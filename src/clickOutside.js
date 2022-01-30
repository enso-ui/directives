const propertyValue = (elem, property) => window
    .getComputedStyle(elem)
    .getPropertyValue(property);

const zIndexProperty = elem => parseInt(propertyValue(elem, 'z-index'), 10);

const zIndex = elem => elem === null
    ? 0
    : zIndexProperty(elem) || zIndex(elem.parentElement);

const intersect = (container, target) => {
    const containerRect = target.getClientRects()[0] || {};
    const targetRect = container.getClientRects()[0] || {};

    return !(targetRect.right < containerRect.left
        || targetRect.bottom < containerRect.top
        || containerRect.bottom < targetRect.top
        || containerRect.right < targetRect.left);
};

const isIndirectChild = (container, target) => !target.contains(container)
    && intersect(container, target)
    && zIndex(target) >= zIndex(container);

const outside = (container, target) => {
    if (target === null) {
        return true;
    }

    const isOutside = container !== target
        && !container.contains(target)
        && !isIndirectChild(container, target);

    const isOutsideOfChildren = () => Array
        .from(container.children)
        .every(elem => outside(elem, target));

    return isOutside && isOutsideOfChildren();
};

const warn = ({ name }) => {
    let warn = '[v-click-outside:] provided expression must be a function';
    warn += name ? `Found in component '${name}'` : '';
    console.warn(warn);
}

let handler = null;

export default {
    beforeMount: (el, binding) => {
        if (typeof binding.value !== 'function') {
            warn(binding.instance);
            return;
        }

        handler = e => {
            if (outside(el, e.target)) {
                binding.value(e);
            }
        };

        document.addEventListener('click', handler);
    },

    unmounted: el => {
        if (handler) {
            document.removeEventListener('click', handler);
        }
    },
};
