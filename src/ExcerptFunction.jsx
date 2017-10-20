
export function validAlbum(element){
    if (!element) return false;
    let albumSelector = novi.plugins.settings.get('novi-plugin-light-gallery').albumQuerySelector;
    return element.matches(albumSelector);
}
export function validGallery(element){
    if (!element) return false;
    let albumSelector = novi.plugins.settings.get('novi-plugin-light-gallery').albumQuerySelector;
    let groupSelector = novi.plugins.settings.get('novi-plugin-light-gallery').groupQuerySelector;
    let dynamic = element.matches(albumSelector);
    let group = element.matches(groupSelector);
    return (dynamic || group);
}

export function validItem(element, childElement){
    if (childElement) return true;
    let itemSelector = novi.plugins.settings.get('novi-plugin-light-gallery').childQuerySelector;
    return element.matches(itemSelector);
}


