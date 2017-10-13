const React = novi.react.React;
const Icons = novi.ui.icons;
import * as ExcerptFunction from "../ExcerptFunction";
import Body from "./Body";

const EditorItem = {
    trigger: Icons.ICON_FACE_SAD,
    tooltip: "Album Settings",
    closeIcon: "submit",
    title: "Album Settings",
    submitOnBlur: false,
    excerpt: ExcerptFunction.validAlbum,
    body: [<Body/>],
    header: [Icons.ICON_FACE_SAD, <span>Album Settings</span>],
    onSubmit: onClick,
    width: 508,
    height: 300
};

export default EditorItem;


function onClick(element) {

}
