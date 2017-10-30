const React = novi.react.React;
const Icons = novi.ui.icons;
import * as ExcerptFunction from "../ExcerptFunction";
import Body from "./Body";
const lodash = novi.utils.lodash;

const EditorItem = {
    trigger: Icons.ICON_PICTURES,
    tooltip: "Album Settings",
    closeIcon: "submit",
    title: "Album Settings",
    excerpt: ExcerptFunction.validAlbum,
    body: [<Body/>],
    header: [Icons.ICON_PICTURES, <span>Album Settings</span>],
    onSubmit: onClick,
    width: 508,
    height: 300
};

export default EditorItem;


function onClick(headerState, bodyState) {
    let state = bodyState[0];
    let refresh = false;
    let element = state.element;
    if (state.elementsToRemove && state.elementsToRemove.length){
        for (let i=0; i<state.elementsToRemove.length; i++){
            novi.element.remove(state.elementsToRemove[i]);
        }
        refresh = true;
    }
    if (lodash.isEqual(state.items, state.initValue.items)){
        if (refresh){
            return novi.page.forceUpdate();
        }
        return;
    }
    refresh = true;
    let targetItems = [];
    for (let i = 0; i < state.items.length; i++) {
        if (lodash.isEqual(state.items[i], state.initValue.items[i])) continue;
        let item = state.items[i];
        let initItem = state.initValue.items[i];
        if (!initItem || item.type !== initItem.type) {

            // url

            // -
            if (initItem && initItem.type === "url") delete item.iframe;
            // +
            if (item.type === "url" && item.src) item.iframe = true;

            // video

            // -
            if (initItem && initItem.type === "video") {
                let videoElement = state.element.ownerDocument.querySelector(item.html);
                if (videoElement) {
                    novi.element.remove(videoElement);
                    delete item.html;
                }
            }

            // +
            if (item.type === "video") {
                let staticElement = novi.element.getStaticReference(state.element);
                let document = staticElement.ownerDocument;
                let j = 1;
                let id = `novi-lg-video-${j}`;
                while (document.getElementById(id) != null) {
                    j++;
                    id = `novi-lg-video-${j}`;
                }
                let videoElement = document.createElement('div');
                videoElement.setAttribute('id', id);
                videoElement.style.display = "none";

                videoElement.innerHTML = `
                  <video class="lg-video-object lg-html5" controls preload="none" src="${item.src}">
                    Your browser does not support HTML5 video.
                  </video>`;

                document.body.append(videoElement);
                item.html = `#${id}`;
                delete item.src;
            }
        }
        else {
            if (item.type === "video") {
                let videoElement = state.element.ownerDocument.querySelector(item.html);
                if (videoElement) {
                    let sources = videoElement.querySelectorAll('source');
                    // Remove all sources
                    if (sources.length) {
                        for (let i = 0; i < sources.length; i++) {
                            novi.element.remove(sources[i]);
                        }
                    }

                    novi.element.setAttribute(videoElement, "src", item.src);
                }
            }
        }
        if (!initItem){
            item.subHtml = item.caption;
        }
        else if (item.caption !== initItem.caption) {
            if (item.captionElement) {
                let staticElement = novi.element.getStaticReference(item.captionElement);
                staticElement.innerHTML = item.caption;
            } else {
                item.subHtml = item.caption;
            }
        }
    }

    for (let i = 0; i < state.items.length; i++) {
        let item = state.items[i];
        let outputItem = {
            subHtml: item.subHtml,
            thumb: item.thumb
        };
        if (item.type === "video"){
            outputItem.html = item.html
        }
        else {
            outputItem.src = item.src
        }
        if (item.type === "url"){
            outputItem.iframe = true
        }
        targetItems.push(outputItem);
    }

    novi.element.setAttribute(element, "data-lg-dynamic-elements", JSON.stringify(targetItems));
    if (refresh){
        novi.page.forceUpdate();
    }
}
