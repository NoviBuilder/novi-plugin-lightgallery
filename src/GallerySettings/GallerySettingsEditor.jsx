const React = novi.react.React;
const Icons = novi.ui.icons;
const lodash = novi.utils.lodash;
import * as ExcerptFunction from "../ExcerptFunction";
import Body from "./Body";
const messages = novi.language.getDataByKey("novi-plugin-light-gallery");
const EditorItem = {
    trigger: <svg viewBox="0 0 20 20">
        <path d="M16.7,19H1.5l0,0C1,19,1,18.5,1,18.5V4.6H0v13.8C0,19.3,0.7,20,1.5,20h15.2"/>
        <path d="M18.5,16h-14l0,0C4,16,4,15.5,4,15.5V1.6H3v13.8C3,16.3,3.7,17,4.5,17h14"/>
        <path d="M4,14.8V1.5l0,0C4,1,4.5,1,4.5,1H11V0L4.6,0C3.7,0,3,0.7,3,1.5v13.3"/>
        <path d="M19,10.2v5.2l0,0c0,0.5-0.5,0.5-0.5,0.5H7.2v1h11.2c0.9,0,1.6-0.7,1.6-1.5v-5.2"/>
        <path d="M15.5,6.2c-0.7,0-1.2-0.5-1.2-1.2s0.5-1.2,1.2-1.2c0.7,0,1.2,0.5,1.2,1.2S16.2,6.2,15.5,6.2z M15.5,4.6
	c-0.2,0-0.4,0.2-0.4,0.4s0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4S15.7,4.6,15.5,4.6z"/>
        <path d="M14.3,9.3h-0.1c-0.7-0.2-1.3-0.6-1.8-1c0-0.1-0.1-0.2-0.1-0.3c0-0.1,0.1-0.2,0.2-0.3c0.3-0.2,0.4-0.7,0.2-1S12.2,6.2,12,6.2
	c-0.1,0-0.2,0-0.3,0.1c-0.1,0-0.2,0-0.3,0c-0.2-0.1-0.3-0.2-0.3-0.3C11,5.7,11,5.3,11,5c0-0.3,0-0.7,0.1-1c0-0.1,0.1-0.2,0.2-0.3
	c0.1,0,0.2,0,0.4,0c0.1,0,0.2,0.1,0.3,0.1c0.3,0,0.6-0.2,0.7-0.4c0.2-0.3,0.1-0.8-0.2-1c-0.1-0.1-0.2-0.3-0.2-0.4
	c0-0.1,0-0.2,0.1-0.3c0.5-0.5,1.1-0.8,1.7-1c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0.2,0.2,0.3c0.1,0.4,0.5,0.7,0.9,0.7s0.7-0.3,0.8-0.7
	c0-0.1,0.1-0.2,0.2-0.3c0.1,0,0.2,0,0.3,0c0.6,0.2,1.2,0.6,1.7,1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1-0.1,0.2-0.2,0.3
	c-0.3,0.2-0.4,0.7-0.2,1c0.3,0.3,0.5,0.5,0.8,0.5c0.1,0,0.2,0,0.3-0.1c0.1,0,0.2,0,0.3,0c0.1,0.1,0.2,0.2,0.2,0.3
	C19.9,4.3,20,4.7,20,5s0,0.7-0.1,1c0,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.1-0.3,0c-0.2-0.1-0.3-0.1-0.4-0.1c-0.3,0-0.6,0.2-0.7,0.4
	c-0.2,0.4-0.1,0.8,0.2,1.1c0.1,0.1,0.1,0.2,0.2,0.3c0,0.1,0,0.2-0.1,0.3c-0.6,0.4-1.2,0.8-1.8,1c-0.1,0-0.2,0-0.3,0
	c-0.1-0.1-0.2-0.2-0.2-0.3c-0.1-0.4-0.4-0.7-0.8-0.7S14.7,8.6,14.7,9c0,0.1-0.1,0.2-0.2,0.3C14.4,9.3,14.4,9.3,14.3,9.3L14.3,9.3z
	 M13.3,8c0.2,0.1,0.5,0.3,0.7,0.4c0.1-0.2,0.2-0.4,0.4-0.5c0.3-0.3,0.7-0.4,1.1-0.4s0.8,0.1,1.1,0.4C16.7,8,16.9,8.2,17,8.4
	c0.3-0.1,0.5-0.2,0.7-0.4c-0.2-0.2-0.2-0.4-0.3-0.6c-0.1-0.4,0-0.8,0.2-1.1c0.3-0.6,0.8-0.9,1.4-0.9h0.1c0-0.1,0-0.3,0-0.4
	s0-0.3,0-0.4H19c-0.6,0-1.1-0.3-1.4-0.8c-0.2-0.4-0.3-0.8-0.2-1.1c0-0.2,0.1-0.4,0.2-0.6c-0.2-0.2-0.4-0.4-0.6-0.5
	c-0.1,0.2-0.3,0.4-0.4,0.6c-0.3,0.2-0.7,0.4-1.1,0.4s-0.8-0.2-1.1-0.4C14.2,2,14.1,1.8,14,1.6c-0.2,0.1-0.5,0.3-0.7,0.5
	c0.1,0.1,0.2,0.3,0.3,0.6c0.1,0.4,0,0.8-0.2,1.1c-0.3,0.5-0.9,0.8-1.4,0.8h-0.1c0,0.1,0,0.3,0,0.4s0,0.3,0,0.4H12
	c0.6,0,1.1,0.3,1.4,0.8c0.2,0.3,0.3,0.7,0.2,1.1C13.5,7.6,13.4,7.8,13.3,8L13.3,8z"/>
    </svg>,
    tooltip: messages.editor.group.tooltip,
    closeIcon: "submit",
    title: messages.editor.group.title,
    body: [<Body/>],
    header: [<svg viewBox="0 0 20 20">
        <path d="M16.7,19H1.5l0,0C1,19,1,18.5,1,18.5V4.6H0v13.8C0,19.3,0.7,20,1.5,20h15.2"/>
        <path d="M18.5,16h-14l0,0C4,16,4,15.5,4,15.5V1.6H3v13.8C3,16.3,3.7,17,4.5,17h14"/>
        <path d="M4,14.8V1.5l0,0C4,1,4.5,1,4.5,1H11V0L4.6,0C3.7,0,3,0.7,3,1.5v13.3"/>
        <path d="M19,10.2v5.2l0,0c0,0.5-0.5,0.5-0.5,0.5H7.2v1h11.2c0.9,0,1.6-0.7,1.6-1.5v-5.2"/>
        <path d="M15.5,6.2c-0.7,0-1.2-0.5-1.2-1.2s0.5-1.2,1.2-1.2c0.7,0,1.2,0.5,1.2,1.2S16.2,6.2,15.5,6.2z M15.5,4.6
	c-0.2,0-0.4,0.2-0.4,0.4s0.2,0.4,0.4,0.4s0.4-0.2,0.4-0.4S15.7,4.6,15.5,4.6z"/>
        <path d="M14.3,9.3h-0.1c-0.7-0.2-1.3-0.6-1.8-1c0-0.1-0.1-0.2-0.1-0.3c0-0.1,0.1-0.2,0.2-0.3c0.3-0.2,0.4-0.7,0.2-1S12.2,6.2,12,6.2
	c-0.1,0-0.2,0-0.3,0.1c-0.1,0-0.2,0-0.3,0c-0.2-0.1-0.3-0.2-0.3-0.3C11,5.7,11,5.3,11,5c0-0.3,0-0.7,0.1-1c0-0.1,0.1-0.2,0.2-0.3
	c0.1,0,0.2,0,0.4,0c0.1,0,0.2,0.1,0.3,0.1c0.3,0,0.6-0.2,0.7-0.4c0.2-0.3,0.1-0.8-0.2-1c-0.1-0.1-0.2-0.3-0.2-0.4
	c0-0.1,0-0.2,0.1-0.3c0.5-0.5,1.1-0.8,1.7-1c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0.2,0.2,0.3c0.1,0.4,0.5,0.7,0.9,0.7s0.7-0.3,0.8-0.7
	c0-0.1,0.1-0.2,0.2-0.3c0.1,0,0.2,0,0.3,0c0.6,0.2,1.2,0.6,1.7,1c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1-0.1,0.2-0.2,0.3
	c-0.3,0.2-0.4,0.7-0.2,1c0.3,0.3,0.5,0.5,0.8,0.5c0.1,0,0.2,0,0.3-0.1c0.1,0,0.2,0,0.3,0c0.1,0.1,0.2,0.2,0.2,0.3
	C19.9,4.3,20,4.7,20,5s0,0.7-0.1,1c0,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.1-0.3,0c-0.2-0.1-0.3-0.1-0.4-0.1c-0.3,0-0.6,0.2-0.7,0.4
	c-0.2,0.4-0.1,0.8,0.2,1.1c0.1,0.1,0.1,0.2,0.2,0.3c0,0.1,0,0.2-0.1,0.3c-0.6,0.4-1.2,0.8-1.8,1c-0.1,0-0.2,0-0.3,0
	c-0.1-0.1-0.2-0.2-0.2-0.3c-0.1-0.4-0.4-0.7-0.8-0.7S14.7,8.6,14.7,9c0,0.1-0.1,0.2-0.2,0.3C14.4,9.3,14.4,9.3,14.3,9.3L14.3,9.3z
	 M13.3,8c0.2,0.1,0.5,0.3,0.7,0.4c0.1-0.2,0.2-0.4,0.4-0.5c0.3-0.3,0.7-0.4,1.1-0.4s0.8,0.1,1.1,0.4C16.7,8,16.9,8.2,17,8.4
	c0.3-0.1,0.5-0.2,0.7-0.4c-0.2-0.2-0.2-0.4-0.3-0.6c-0.1-0.4,0-0.8,0.2-1.1c0.3-0.6,0.8-0.9,1.4-0.9h0.1c0-0.1,0-0.3,0-0.4
	s0-0.3,0-0.4H19c-0.6,0-1.1-0.3-1.4-0.8c-0.2-0.4-0.3-0.8-0.2-1.1c0-0.2,0.1-0.4,0.2-0.6c-0.2-0.2-0.4-0.4-0.6-0.5
	c-0.1,0.2-0.3,0.4-0.4,0.6c-0.3,0.2-0.7,0.4-1.1,0.4s-0.8-0.2-1.1-0.4C14.2,2,14.1,1.8,14,1.6c-0.2,0.1-0.5,0.3-0.7,0.5
	c0.1,0.1,0.2,0.3,0.3,0.6c0.1,0.4,0,0.8-0.2,1.1c-0.3,0.5-0.9,0.8-1.4,0.8h-0.1c0,0.1,0,0.3,0,0.4s0,0.3,0,0.4H12
	c0.6,0,1.1,0.3,1.4,0.8c0.2,0.3,0.3,0.7,0.2,1.1C13.5,7.6,13.4,7.8,13.3,8L13.3,8z"/>
    </svg>, <span>{messages.editor.group.header}</span>],
    onSubmit: onClick,
    width: 400,
    excerpt: ExcerptFunction.validGallery,
    height: 180
};

export default EditorItem;


function onClick(headerState, bodyState) {
    let state = bodyState[0];
    if (state.loop !== state.initValue.loop){
        novi.element.setAttribute(state.element, "data-lg-loop", state.loop)
    }
    if (state.thumbnail !== state.initValue.thumbnail){
        novi.element.setAttribute(state.element, "data-lg-thumbnail", state.thumbnail)
    }
    if (state.autoplay !== state.initValue.autoplay){
        novi.element.setAttribute(state.element, "data-lg-autoplay", state.autoplay)
    }
    if (state.autoplayTime !== state.initValue.autoplayTime){
        novi.element.setAttribute(state.element, "data-lg-autoplay-delay", state.autoplayTime * 1000)
    }
    if (!lodash.isEqual(state.animation, state.initValue.animation)){
        novi.element.setAttribute(state.element, "data-lg-animation", state.animation.value)
    }
}
