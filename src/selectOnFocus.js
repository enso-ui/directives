export default {
    inserted: el => el.addEventListener('focus', el.select),
    unbind: el => el.removeEventListener('focus', el.select),
};
