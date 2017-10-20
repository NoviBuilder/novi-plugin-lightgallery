const React = novi.react.React;
const Icons = novi.ui.icons;
const Icon = novi.ui.icon;
const lodash = novi.utils.lodash;
import Body from "./Body";
import * as ExcerptFunction from "../ExcerptFunction";

const EditorItem = {
    trigger: <Icon>{Icons.ICON_BG_IMAGE}</Icon>,
    header: [<Icon>{Icons.ICON_BG_IMAGE}</Icon>, <span>Gallery Item</span>],
    body: [<Body/>],
    tooltip: "Edit Gallery Item",
    closeIcon: "submit",
    title: "Edit Gallery Item",
    width: 400,
    height: 240,
    onSubmit: onSubmitClick,
    excerpt: ExcerptFunction.validItem,
    collapsed: true,
    highlightChild: true
};

export default EditorItem;

function onSubmitClick(headerStates, bodyStates) {
    let state = bodyStates[0];

    let compareState = {
        link: state.link,
        caption: state.caption,
        type: state.type
    };

    if (lodash.isEqual(compareState, state.initData)) return;

    // Change src
    if (state.initData.link !== state.link) {
        // if type of content changed
        if (state.initData.type !== state.type) {

            // if src was just url remove attribute data-iframe
            if (state.initData.type === "url") {
                novi.element.removeAttribute(state.childElement, "data-iframe");
            }

            // if src now is url set attribute data-iframe
            if (state.type === "url") {
                novi.element.setAttribute(state.childElement, "data-iframe", "true");
            }

            // if src was video
            if (state.initData.type === "video") {
                if (state.videoElement) {
                    novi.element.remove(state.videoElement.parentElement);
                    novi.element.removeAttribute(state.childElement, 'data-html');
                }
            }

            // if src is video
            if (state.type === "video") {
                let staticElement = novi.element.getStaticReference(state.childElement);
                let document = staticElement.ownerDocument;
                let i = 1;
                let id = `novi-lg-video-${i}`;

                while (document.getElementById(id) != null) {
                    i++;
                    id = `novi-lg-video-${i}`;
                }

                let videoElement = document.createElement('div');
                videoElement.setAttribute('id', id);
                videoElement.style.display = "none";

                videoElement.innerHTML = `
                      <video class="lg-video-object lg-html5" controls preload="none" src="${state.link}">
                        Your browser does not support HTML5 video.
                      </video>`;

                document.body.append(videoElement);

                novi.element.setAttribute(state.childElement, 'data-html', `#${id}`);
                novi.element.removeAttribute(state.childElement, 'data-src');
                novi.element.removeAttribute(state.childElement, 'href');
            }
        }else{
            if (state.type === "video"){
                let sources = state.videoElement.querySelectorAll('source');
                // Remove all sources
                if (sources.length){
                    for (let i =0; i < sources.length; i++){
                        novi.element.remove(sources[i]);
                    }
                }

                novi.element.setAttribute(state.videoElement, "src", state.link);
            }
        }

        if (state.type !== "video"){
            if (state.childElement.tagName === 'A' && state.childElement.hasAttribute("href")) {
                novi.element.setAttribute(state.childElement, "href", state.link);
            } else {
                novi.element.setAttribute(state.childElement, "data-src", state.link);
            }
        }
    }

    // Change Caption
    if (state.initData.caption !== state.caption) {
        if (state.captionElement){
            let staticElement = novi.element.getStaticReference(state.captionElement);
            staticElement.innerHTML = state.caption;
        }else{
            novi.element.setAttribute(state.childElement, 'data-sub-html', state.caption);
        }
    }

    novi.page.forceUpdate();
}
