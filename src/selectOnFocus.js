export default {
    mounted: el => el.addEventListener('focus', el.select),
    unmounted: el => el.removeEventListener('focus', el.select),
};
