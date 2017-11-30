import * as Utils from "./Utils";

const React = novi.react.React;
const Component = novi.react.Component;
const Input = novi.ui.input;
const CodeEditor = novi.ui.codeEditor;
const Button = novi.ui.button;
const Icon = novi.ui.icon;
const Types = novi.types;
const axios = novi.utils.axios;
const Link = novi.ui.link;
const Language = novi.language;
export default class GalleryItemSettings extends Component {
    constructor(props) {
        super(props);
        let thumbPreview = /[^\s]+\.(svg|jpeg|jpg|gif|png)\s*$/.test(props.thumb);
        this.state = {
            src: props.src,
            caption: props.caption || "",
            preview: props.src && !!props.src.length,
            thumbPreview: props.thumb && !!props.thumb.length && thumbPreview,
            thumbInput: !props.thumb || !!props.thumb.length < 1 || thumbPreview,
            type: props.type,
            thumb: props.thumb,
            thumbnail: props.thumbnail || false
        };

        if (props.thumbnail) novi.editor.setBodyHeight(350);

        this.typeTimer = null;
        this.videoId = props.videoId;

        this.onCaptionChange = this.onCaptionChange.bind(this);
        this.onChooseImage = this.onChooseImage.bind(this);
        this.onCodeEditorInit = this.onCodeEditorInit.bind(this);
        this.openMediaLibrary = this.openMediaLibrary.bind(this);
        this.openThumbMediaLibrary = this.openThumbMediaLibrary.bind(this);
        this.onEditorFocus = this.onEditorFocus.bind(this);
        this.onEditorBlur = this.onEditorBlur.bind(this);
        this.onSrcChange = this.onSrcChange.bind(this);
        this.setNewType = this.setNewType.bind(this);
        this._renderReturnButton = this._renderReturnButton.bind(this);
        this.onThumbChange = this.onThumbChange.bind(this);
        this.onThumbChooseImage = this.onThumbChooseImage.bind(this);
        this.onBackClick = this.onBackClick.bind(this);

        this.style = `
            .lg-item-wrap .code-editor{
                height: 100px;
            }
            .lg-item-wrap .link-primary{
                display: inline-block;
            }
            .input-wrap{
                position: relative;
            }
            .input-wrap input{
                padding-right: 40px;
            }
            .lg-preview-button{
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 40px;
                text-align: center;
                cursor: pointer;
            }
            .input-wrap.disabled input {
                border-color: red;
                
            }
            .lg-preview-button.disabled{
                pointer-events: none;
                opacity: 0.5; 
            }
            
            .lg-preview-button svg{
                width: 20px;
                height: 30px;
                fill: #fff; 
            }
            .lg-item-wrap-back{
                display: flex;
                align-items: flex-start;
                margin-top: 10px;
                justify-content: flex-end;
            }
            .lg-item-wrap-back svg{
                width: 12px; 
                padding-right: 5px;
                position: relative;
                top: 1px;
            }
        `;
        this.messages = Language.getDataByKey("novi-plugin-light-gallery");
    }

    componentWillReceiveProps(props) {
        this.setState({
            src: props.src,
            caption: props.caption,
            thumbnail: props.thumbnail || false
        })
    }

    componentWillUnmount() {
        if (this.editor) {
            this.editor.removeEventListener("focus", this.onEditorFocus);
            this.editor.removeEventListener("blur", this.onEditorBlur);
            this.editor.removeEventListener("change", this.onCaptionChange);
        }
    }

    render() {
        let previewButtonClass = this.state.preview ? "lg-preview-button" : "lg-preview-button disabled";
        return (
            <div className="lg-item-wrap">
                <style>{this.style}</style>

                <div className="input-wrap-group">
                    <p className="novi-label" style={{marginTop: 0}}>
                        {this.messages.editor.item.body.src}
                    </p>

                    <div className="input-wrap">
                        <Input value={this.state.src} onChange={this.onSrcChange}/>
                        <div className={previewButtonClass} onClick={this.openPreview.bind(this, this.state.src)} data-for="tooltip-global" data-tip="Open link preview">
                            <svg viewBox="0 0 20 20">
                                <path
                                    d="M19.872 10.166c-0.047-0.053-1.182-1.305-2.956-2.572-1.047-0.748-2.1-1.344-3.13-1.773-1.305-0.544-2.579-0.82-3.786-0.82s-2.481 0.276-3.786 0.82c-1.030 0.429-2.083 1.026-3.13 1.773-1.774 1.267-2.909 2.52-2.956 2.572-0.171 0.19-0.171 0.479 0 0.669 0.047 0.053 1.182 1.305 2.956 2.572 1.047 0.748 2.1 1.344 3.13 1.773 1.305 0.544 2.579 0.82 3.786 0.82s2.481-0.276 3.786-0.82c1.030-0.429 2.083-1.026 3.13-1.773 1.774-1.267 2.909-2.52 2.956-2.572 0.171-0.19 0.171-0.479 0-0.669zM12.574 6.438c0.907 0.763 1.426 1.873 1.426 3.062 0 2.206-1.794 4-4 4s-4-1.794-4-4c0-1.188 0.519-2.299 1.426-3.062 0.822-0.268 1.691-0.438 2.574-0.438s1.752 0.17 2.574 0.438zM16.317 12.606c-1.533 1.092-3.873 2.394-6.317 2.394s-4.784-1.302-6.317-2.394c-1.157-0.824-2.042-1.658-2.489-2.106 0.447-0.448 1.332-1.281 2.489-2.106 0.53-0.378 1.156-0.78 1.85-1.145-0.347 0.688-0.533 1.455-0.533 2.251 0 2.757 2.243 5 5 5s5-2.243 5-5c0-0.796-0.186-1.563-0.533-2.251 0.694 0.365 1.32 0.768 1.85 1.145 1.157 0.824 2.042 1.658 2.489 2.106-0.447 0.448-1.332 1.281-2.489 2.106z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div style={{textAlign: 'right', marginTop:5}}>
                        <Link type="primary" onClick={this.openMediaLibrary}>{this.messages.editor.item.body.openLibrary}</Link>
                    </div>
                </div>


                {this._renderThumbnail()}


                <p className="novi-label" style={{marginTop: 10}}>
                    {this.messages.editor.item.body.description}
                </p>
                <CodeEditor mode={"html"} onInit={this.onCodeEditorInit}/>
                {this._renderReturnButton()}
            </div>

        )
    }

    onCodeEditorInit(editor) {
        this.editor = editor;
        this.editor.addEventListener("change", this.onCaptionChange);
        this.editor.addEventListener("focus", this.onEditorFocus);
        this.editor.addEventListener("blur", this.onEditorBlur);
        this.silent = true;
        this.editor.setValue(novi.utils.beautifyHTML(this.state.caption), 1);
        this.silent = false;
    }

    onEditorFocus() {
        this.focused = true;
    }

    onEditorBlur() {
        this.focused = false;
    }

    onCaptionChange() {
        if (this.silent || !this.focused) return;

        let state = this.state;
        state.caption = this.editor.getValue();
        this.setState(state);
        this.props.onChange && this.props.onChange(this.buildChangeData(state));
    }

    onSrcChange(e) {
        clearTimeout(this.typeTimer);
        let state = this.state;
        state.src = e.target.value;
        state.preview = false;
        this.setState(state);
        this.props.onChange && this.props.onChange(this.buildChangeData(state));

        this.typeTimer = setTimeout(()=>{
            this.setNewType(state);
        }, 1000);
    }

    openMediaLibrary() {
        let data = {
            onSubmit: this.onChooseImage,
        };

        novi.media.choose(data);
    }

    onChooseImage(data) {
        let state = this.state;
        state.src = data;
        this.setState(state);
        this.setNewType(state);
    }

    buildChangeData(state) {
        return {
            src: state.src,
            caption: state.caption,
            type: state.type,
            thumb: state.thumb
        }
    }

    openPreview(link) {
        let src = new String();
        src = src.concat(link);

        if (novi.utils.isRelativeURL(src)) {
            src = novi.utils.getAbsolutePath(this.props.relativeDir + src);
        }

        if (this.state.type === "url"){
            return window.open(src, "_blank");
        }

        if (this.state.type === "youtube" || this.state.type === "vimeo"){
            novi.modal.linkPreview({type: this.state.type, link: this.videoId});
        }else{
            novi.modal.linkPreview({type: this.state.type, link: src});
        }
    }

    setNewType(state){
        let result = Utils.getLinkType(state.src);
        if ((result.type === "youtube" || result.type === "vimeo") && result.id != null){
            this.videoId = result.id;
        }
        state.preview = state.src.length > 0;

        state.type = result.type;

        if (result.type === "vimeo" && result.id == null){
            axios.get(`https://vimeo.com/api/oembed.json?url=${state.src}`).then(response => {
                if (!response || !response.data) return;

                let src = "http://vimeo.com/" + response.data.video_id;
                this.videoId = response.data.video_id;
                state.src = src;
                this.setState(state);
                this.props.onChange && this.props.onChange(this.buildChangeData(state));
            })
        }else{
            this.setState(state);
            this.props.onChange && this.props.onChange(this.buildChangeData(state));
        }
    }

    _renderReturnButton(){
        if (!this.props.onReturn) return null;
        return (
            <div className="lg-item-wrap-back">
                <svg  viewBox="0 0 20 20">
                    <path d="M0.646 10.146l6-6c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-5.146 5.146h16.293c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5h-16.293l5.146 5.146c0.195 0.195 0.195 0.512 0 0.707-0.098 0.098-0.226 0.146-0.354 0.146s-0.256-0.049-0.354-0.146l-6-6c-0.195-0.195-0.195-0.512 0-0.707z" stroke="#109DF7" strokeWidth="2"/>
                </svg>
                <Link type="primary" onClick={this.onBackClick}>
                    {this.messages.editor.item.body.backToAlbum}
                </Link>
            </div>
        )
    }

    onBackClick(){
        novi.editor.setBodyHeight(300);
        this.props.onReturn();
    }

    _renderThumbnail(){
        if (!this.props.thumbnail) return null;
        let previewButtonClass = this.state.thumbPreview ? "lg-preview-button" : "lg-preview-button disabled";
        let thumbInputDisabled = this.state.thumbInput ? "input-wrap" : "input-wrap disabled";
        return(
            <div className="input-wrap-group" style={{marginTop: 10}}>
                <p className="novi-label" style={{marginTop: 0}}>
                    {this.messages.editor.item.body.thumb}
                </p>

                <div className={thumbInputDisabled}>
                    <Input value={this.state.thumb} onChange={this.onThumbChange}/>
                    <div className={previewButtonClass} onClick={this.openThumbPreview.bind(this)} data-for="tooltip-global" data-tip="Open link preview">
                        <svg viewBox="0 0 20 20">
                            <path
                                d="M19.872 10.166c-0.047-0.053-1.182-1.305-2.956-2.572-1.047-0.748-2.1-1.344-3.13-1.773-1.305-0.544-2.579-0.82-3.786-0.82s-2.481 0.276-3.786 0.82c-1.030 0.429-2.083 1.026-3.13 1.773-1.774 1.267-2.909 2.52-2.956 2.572-0.171 0.19-0.171 0.479 0 0.669 0.047 0.053 1.182 1.305 2.956 2.572 1.047 0.748 2.1 1.344 3.13 1.773 1.305 0.544 2.579 0.82 3.786 0.82s2.481-0.276 3.786-0.82c1.030-0.429 2.083-1.026 3.13-1.773 1.774-1.267 2.909-2.52 2.956-2.572 0.171-0.19 0.171-0.479 0-0.669zM12.574 6.438c0.907 0.763 1.426 1.873 1.426 3.062 0 2.206-1.794 4-4 4s-4-1.794-4-4c0-1.188 0.519-2.299 1.426-3.062 0.822-0.268 1.691-0.438 2.574-0.438s1.752 0.17 2.574 0.438zM16.317 12.606c-1.533 1.092-3.873 2.394-6.317 2.394s-4.784-1.302-6.317-2.394c-1.157-0.824-2.042-1.658-2.489-2.106 0.447-0.448 1.332-1.281 2.489-2.106 0.53-0.378 1.156-0.78 1.85-1.145-0.347 0.688-0.533 1.455-0.533 2.251 0 2.757 2.243 5 5 5s5-2.243 5-5c0-0.796-0.186-1.563-0.533-2.251 0.694 0.365 1.32 0.768 1.85 1.145 1.157 0.824 2.042 1.658 2.489 2.106-0.447 0.448-1.332 1.281-2.489 2.106z"
                            />
                        </svg>
                    </div>
                </div>
                <div style={{textAlign: 'right', marginTop:5}}>
                    <Link type="primary" onClick={this.openThumbMediaLibrary}>{this.messages.editor.item.body.openLibrary}</Link>
                </div>
            </div>
        )
    }

    onThumbChange(e) {
        clearTimeout(this.typeTimer);
        let state = this.state;
        state.thumb = e.target.value;
        this.setState(state);
        this.props.onChange && this.props.onChange(this.buildChangeData(state));
        this.typeTimer = setTimeout(()=>{
            let thumbPreview = this._getThumbPreview(state);
            let thumbInput = this._getThumbInputPreview(state);
            if (thumbPreview !== null && thumbInput !== null){
                this.setState({
                    thumbPreview,
                    thumbInput
                })
            }
            else if (thumbInput !== null){
                this.setState({
                    thumbInput
                })
            }
            else if (thumbPreview !== null){
                this.setState({
                    thumbPreview
                })
            }

        }, 300);
    }

    _getThumbPreview(state){
        let thumbPreview = /[^\s]+\.(svg|jpeg|jpg|gif|png)\s*$/.test(state.thumb);
        if (thumbPreview !== state.thumbPreview && state.thumb.length > 0) return thumbPreview;
        return null;
    }

    _getThumbInputPreview(state){
        let thumbPreview = /[^\s]+\.(svg|jpeg|jpg|gif|png)\s*$/.test(state.thumb);
        if (state.thumb.length < 1 && !state.thumbInput) return true;
        if (thumbPreview !== state.thumbInput && state.thumb.length > 0) return thumbPreview;
        return null;
    }

    openThumbMediaLibrary(){
        let data = {
            onSubmit: this.onThumbChooseImage,
            type: Types.mediaImage
        };

        novi.media.choose(data);
    }

    onThumbChooseImage(data) {
        let state = this.state;
        state.thumb = data;
        state.thumbPreview = true;
        this.setState(state);
        this.props.onChange && this.props.onChange(this.buildChangeData(state));
    }

    openThumbPreview(){
        let src = new String();
        src = src.concat(this.state.thumb);

        if (novi.utils.isRelativeURL(src)) {
            src = novi.utils.getAbsolutePath(this.props.relativeDir + src);
        }
        novi.modal.linkPreview({type: "image", link: src});
    }
}