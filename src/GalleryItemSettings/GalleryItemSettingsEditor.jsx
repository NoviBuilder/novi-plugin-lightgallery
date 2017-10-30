const React = novi.react.React;
const Icons = novi.ui.icons;
const Icon = novi.ui.icon;
const lodash = novi.utils.lodash;
import Body from "./Body";
import * as ExcerptFunction from "../ExcerptFunction";

const EditorItem = {
    trigger: <Icon>{<svg viewBox="0 0 20 20">
<path d="M13.5,9C12.1,9,11,7.9,11,6.5S12.1,4,13.5,4S16,5.1,16,6.5S14.9,9,13.5,9z M13.5,5C12.7,5,12,5.7,12,6.5S12.7,8,13.5,8
	S15,7.3,15,6.5S14.3,5,13.5,5z"/>
<path d="M8.5,1h10C18.8,1,19,1.2,19,1.5v17l0,0c0,0.3-0.2,0.5-0.5,0.5h-2.8l-9-8.6C6.4,10.2,6,10,5.6,10s-0.8,0.2-1,0.5L1,14.3V9
	C0.8,9,0.2,9,0,9v9.5C0,19.3,0.7,20,1.5,20h17c0.8,0,1.5-0.7,1.5-1.5v-17C20,0.7,19.3,0,18.5,0h-10 M1.5,19C1.2,19,1,18.8,1,18.5
	l0,0v-2.7l4.3-4.6C5.4,11.1,5.5,11,5.6,11s0.2,0,0.3,0.1l8.4,7.9H1.5z"/>
<path d="M4.5,5.5C3.8,5.5,3.3,5,3.3,4.3s0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2S5.2,5.5,4.5,5.5z M4.5,3.9c-0.2,0-0.4,0.2-0.4,0.4
	s0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4S4.7,3.9,4.5,3.9z"/>
<path d="M3.3,8.6c0,0-0.1,0-0.1,0C2.5,8.4,1.9,8,1.4,7.6C1.4,7.5,1.3,7.4,1.3,7.3c0-0.1,0.1-0.2,0.2-0.3c0.3-0.2,0.4-0.7,0.2-1
	C1.5,5.7,1.2,5.5,1,5.5c-0.1,0-0.2,0-0.3,0.1c-0.1,0-0.2,0-0.3,0C0.2,5.5,0.1,5.4,0.1,5.3C0,5,0,4.6,0,4.3c0-0.3,0-0.7,0.1-1
	c0-0.1,0.1-0.2,0.2-0.3C0.4,3,0.5,3,0.7,3c0.1,0,0.2,0.1,0.3,0.1c0.3,0,0.6-0.2,0.7-0.4c0.2-0.3,0.1-0.8-0.2-1
	C1.4,1.6,1.3,1.4,1.3,1.3c0-0.1,0-0.2,0.1-0.3c0.5-0.5,1.1-0.8,1.7-1c0.1,0,0.2,0,0.3,0s0.2,0.2,0.2,0.3C3.7,0.7,4.1,1,4.5,1
	s0.7-0.3,0.8-0.7c0-0.1,0.1-0.2,0.2-0.3C5.6,0,5.7,0,5.8,0C6.4,0.2,7,0.6,7.5,1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1-0.1,0.2-0.2,0.3
	c-0.3,0.2-0.4,0.7-0.2,1C7.5,2.9,7.7,3.1,8,3.1c0.1,0,0.2,0,0.3-0.1c0.1,0,0.2,0,0.3,0c0.1,0.1,0.2,0.2,0.2,0.3C8.9,3.6,9,4,9,4.3
	c0,0.3,0,0.7-0.1,1c0,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.1-0.3,0C8.2,5.5,8.1,5.5,8,5.5c-0.3,0-0.6,0.2-0.7,0.4
	C7.1,6.3,7.2,6.7,7.5,7c0.1,0.1,0.1,0.2,0.2,0.3c0,0.1,0,0.2-0.1,0.3C7,8,6.4,8.4,5.8,8.6c-0.1,0-0.2,0-0.3,0
	C5.4,8.5,5.3,8.4,5.3,8.3C5.2,7.9,4.9,7.6,4.5,7.6S3.7,7.9,3.7,8.3c0,0.1-0.1,0.2-0.2,0.3C3.4,8.6,3.4,8.6,3.3,8.6L3.3,8.6z
	 M2.3,7.3C2.5,7.4,2.8,7.6,3,7.7c0.1-0.2,0.2-0.4,0.4-0.5c0.3-0.3,0.7-0.4,1.1-0.4s0.8,0.1,1.1,0.4C5.7,7.3,5.9,7.5,6,7.7
	c0.3-0.1,0.5-0.2,0.7-0.4C6.5,7.1,6.5,6.9,6.4,6.7c-0.1-0.4,0-0.8,0.2-1.1C6.9,5,7.4,4.7,8,4.7c0,0,0.1,0,0.1,0c0-0.1,0-0.3,0-0.4
	s0-0.3,0-0.4c0,0-0.1,0-0.1,0c-0.6,0-1.1-0.3-1.4-0.8C6.4,2.7,6.3,2.3,6.4,2c0-0.2,0.1-0.4,0.2-0.6C6.4,1.2,6.2,1,6,0.9
	C5.9,1.1,5.7,1.3,5.6,1.5C5.3,1.7,4.9,1.9,4.5,1.9S3.7,1.7,3.4,1.5C3.2,1.3,3.1,1.1,3,0.9C2.8,1,2.5,1.2,2.3,1.4
	C2.4,1.5,2.5,1.7,2.6,2c0.1,0.4,0,0.8-0.2,1.1C2.1,3.6,1.5,3.9,1,3.9c0,0-0.1,0-0.1,0c0,0.1,0,0.3,0,0.4s0,0.3,0,0.4
	c0,0,0.1,0,0.1,0c0.6,0,1.1,0.3,1.4,0.8c0.2,0.3,0.3,0.7,0.2,1.1C2.5,6.9,2.4,7.1,2.3,7.3L2.3,7.3z"/>
</svg>}</Icon>,
    header: [<Icon>{<svg viewBox="0 0 20 20">
        <path d="M13.5,9C12.1,9,11,7.9,11,6.5S12.1,4,13.5,4S16,5.1,16,6.5S14.9,9,13.5,9z M13.5,5C12.7,5,12,5.7,12,6.5S12.7,8,13.5,8
	S15,7.3,15,6.5S14.3,5,13.5,5z"/>
        <path d="M8.5,1h10C18.8,1,19,1.2,19,1.5v17l0,0c0,0.3-0.2,0.5-0.5,0.5h-2.8l-9-8.6C6.4,10.2,6,10,5.6,10s-0.8,0.2-1,0.5L1,14.3V9
	C0.8,9,0.2,9,0,9v9.5C0,19.3,0.7,20,1.5,20h17c0.8,0,1.5-0.7,1.5-1.5v-17C20,0.7,19.3,0,18.5,0h-10 M1.5,19C1.2,19,1,18.8,1,18.5
	l0,0v-2.7l4.3-4.6C5.4,11.1,5.5,11,5.6,11s0.2,0,0.3,0.1l8.4,7.9H1.5z"/>
        <path d="M4.5,5.5C3.8,5.5,3.3,5,3.3,4.3s0.5-1.2,1.2-1.2s1.2,0.5,1.2,1.2S5.2,5.5,4.5,5.5z M4.5,3.9c-0.2,0-0.4,0.2-0.4,0.4
	s0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4S4.7,3.9,4.5,3.9z"/>
        <path d="M3.3,8.6c0,0-0.1,0-0.1,0C2.5,8.4,1.9,8,1.4,7.6C1.4,7.5,1.3,7.4,1.3,7.3c0-0.1,0.1-0.2,0.2-0.3c0.3-0.2,0.4-0.7,0.2-1
	C1.5,5.7,1.2,5.5,1,5.5c-0.1,0-0.2,0-0.3,0.1c-0.1,0-0.2,0-0.3,0C0.2,5.5,0.1,5.4,0.1,5.3C0,5,0,4.6,0,4.3c0-0.3,0-0.7,0.1-1
	c0-0.1,0.1-0.2,0.2-0.3C0.4,3,0.5,3,0.7,3c0.1,0,0.2,0.1,0.3,0.1c0.3,0,0.6-0.2,0.7-0.4c0.2-0.3,0.1-0.8-0.2-1
	C1.4,1.6,1.3,1.4,1.3,1.3c0-0.1,0-0.2,0.1-0.3c0.5-0.5,1.1-0.8,1.7-1c0.1,0,0.2,0,0.3,0s0.2,0.2,0.2,0.3C3.7,0.7,4.1,1,4.5,1
	s0.7-0.3,0.8-0.7c0-0.1,0.1-0.2,0.2-0.3C5.6,0,5.7,0,5.8,0C6.4,0.2,7,0.6,7.5,1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1-0.1,0.2-0.2,0.3
	c-0.3,0.2-0.4,0.7-0.2,1C7.5,2.9,7.7,3.1,8,3.1c0.1,0,0.2,0,0.3-0.1c0.1,0,0.2,0,0.3,0c0.1,0.1,0.2,0.2,0.2,0.3C8.9,3.6,9,4,9,4.3
	c0,0.3,0,0.7-0.1,1c0,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.1-0.3,0C8.2,5.5,8.1,5.5,8,5.5c-0.3,0-0.6,0.2-0.7,0.4
	C7.1,6.3,7.2,6.7,7.5,7c0.1,0.1,0.1,0.2,0.2,0.3c0,0.1,0,0.2-0.1,0.3C7,8,6.4,8.4,5.8,8.6c-0.1,0-0.2,0-0.3,0
	C5.4,8.5,5.3,8.4,5.3,8.3C5.2,7.9,4.9,7.6,4.5,7.6S3.7,7.9,3.7,8.3c0,0.1-0.1,0.2-0.2,0.3C3.4,8.6,3.4,8.6,3.3,8.6L3.3,8.6z
	 M2.3,7.3C2.5,7.4,2.8,7.6,3,7.7c0.1-0.2,0.2-0.4,0.4-0.5c0.3-0.3,0.7-0.4,1.1-0.4s0.8,0.1,1.1,0.4C5.7,7.3,5.9,7.5,6,7.7
	c0.3-0.1,0.5-0.2,0.7-0.4C6.5,7.1,6.5,6.9,6.4,6.7c-0.1-0.4,0-0.8,0.2-1.1C6.9,5,7.4,4.7,8,4.7c0,0,0.1,0,0.1,0c0-0.1,0-0.3,0-0.4
	s0-0.3,0-0.4c0,0-0.1,0-0.1,0c-0.6,0-1.1-0.3-1.4-0.8C6.4,2.7,6.3,2.3,6.4,2c0-0.2,0.1-0.4,0.2-0.6C6.4,1.2,6.2,1,6,0.9
	C5.9,1.1,5.7,1.3,5.6,1.5C5.3,1.7,4.9,1.9,4.5,1.9S3.7,1.7,3.4,1.5C3.2,1.3,3.1,1.1,3,0.9C2.8,1,2.5,1.2,2.3,1.4
	C2.4,1.5,2.5,1.7,2.6,2c0.1,0.4,0,0.8-0.2,1.1C2.1,3.6,1.5,3.9,1,3.9c0,0-0.1,0-0.1,0c0,0.1,0,0.3,0,0.4s0,0.3,0,0.4
	c0,0,0.1,0,0.1,0c0.6,0,1.1,0.3,1.4,0.8c0.2,0.3,0.3,0.7,0.2,1.1C2.5,6.9,2.4,7.1,2.3,7.3L2.3,7.3z"/>
    </svg>}</Icon>, <span>Gallery Item</span>],
    body: [<Body/>],
    tooltip: "Edit Gallery Item",
    closeIcon: "submit",
    title: "Edit Gallery Item",
    width: 400,
    height: 240,
    onSubmit: onSubmitClick,
    excerpt: ExcerptFunction.validItem,
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
