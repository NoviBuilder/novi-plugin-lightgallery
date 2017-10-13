
export function validAlbum(element){
    if (!element) return false;
    return novi.element.getAttribute(element, "data-lightgallery") === "dynamic"
}
export function validGallery(element){
    if (!element) return false;
    let dynamic = novi.element.getAttribute(element, "data-lightgallery") === "dynamic";
    let group = novi.element.getAttribute(element, "data-lightgallery") === "group";
    return (dynamic || group);
}
