const React = novi.react.React;
const Icons = novi.ui.icons;
const lodash = novi.utils.lodash;
import * as ExcerptFunction from "../ExcerptFunction";
import Body from "./Body";

const EditorItem = {
    trigger: Icons.ICON_PICTURES,
    tooltip: "Gallery Settings",
    closeIcon: "submit",
    title: "Gallery Settings",
    body: [<Body/>],
    header: [Icons.ICON_PICTURES, <span>Gallery Settings</span>],
    onSubmit: onClick,
    width: 360,
    excerpt: ExcerptFunction.validGallery,
    height: 180,
    collapsed: true
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
