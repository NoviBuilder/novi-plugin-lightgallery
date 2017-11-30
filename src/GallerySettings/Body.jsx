const InputNumber = novi.ui.inputNumber;
const React = novi.react.React;
const Component = novi.react.Component;
const Switcher = novi.ui.switcher;
const Select = novi.ui.select;
const Language = novi.language;
export default class Body extends Component {
    constructor(props) {
        super(props);
        let loop = novi.element.getAttribute(props.element, 'data-lg-loop') === 'true';
        let thumbnail = novi.element.getAttribute(props.element, 'data-lg-thumbnail') === 'true';
        let autoplay = novi.element.getAttribute(props.element, 'data-lg-autoplay') === 'true';
        let autoplayTime = parseInt(novi.element.getAttribute(props.element, 'data-lg-autoplay-delay')) / 1000 || 5;
        let animationName = novi.element.getAttribute(props.element, 'data-lg-animation');
        let animation =  animationName ? {label: animationName, value: animationName}: {label: "lg-slide", value: "lg-slide"};
        if (!autoplay) novi.editor.setBodyHeight(140);
        this.state = {
            loop,
            thumbnail,
            autoplay,
            autoplayTime,
            animation,
            initValue: {
                loop,
                thumbnail,
                autoplay,
                autoplayTime,
                animation
            },
            element: props.element
        };

        this.style = `
        .lightgallery-group{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .lightgallery-group-switcher{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 16px;
            -webkit-transition: 0.1s all cubic-bezier(0.4, 0, 1, 1); 
            transition: 0.1s all cubic-bezier(0.4, 0, 1, 1);
            backface-visibility: hidden;
            
        }
        .lightgallery-group > .lightgallery-group-switcher{
        max-width: 33%;
        }
        .lightgallery-group-switcher.disabled{
                opacity: 0;
                visibility: hidden;
                height: 0;
                margin-top: 0;
        }
        .lightgallery-group-switcher + .lightgallery-group-switcher{
            margin-left: 10px;
        }
        .lightgallery-group-switcher .novi-label{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .lightgallery-group-switcher .novi-switcher{
            flex-shrink: 0;
        }
        .lightgallery-group-switcher .novi-input{
            width: 55px;
        }  
        
        .lightgallery-group-wrap .Select-menu-outer, .lightgallery-group-wrap .Select-menu{
            max-height: 110px;
        }
        `;

        this.animations = [
            {label:"lg-slide", value:"lg-slide"},
            {label:"lg-fade", value:"lg-fade"},
            {label:"lg-zoom-in", value:"lg-zoom-in"},
            {label:"lg-zoom-in-big", value:"lg-zoom-in-big"},
            {label:"lg-zoom-out", value:"lg-zoom-out"},
            {label:"lg-zoom-out-big", value:"lg-zoom-out-big"},
            {label:"lg-zoom-out-in", value:"lg-zoom-out-in"},
            {label:"lg-zoom-in-out", value:"lg-zoom-in-out"},
            {label:"lg-soft-zoom", value:"lg-soft-zoom"},
            {label:"lg-scale-up", value:"lg-scale-up"},
            {label:"lg-slide-circular", value:"lg-slide-circular"},
            {label:"lg-slide-circular-vertical", value:"lg-slide-circular-vertical"},
            {label:"lg-slide-vertical", value:"lg-slide-vertical"},
            {label:"lg-slide-vertical-growth", value:"lg-slide-vertical-growth"},
            {label:"lg-slide-skew-only", value:"lg-slide-skew-only"},
            {label:"lg-slide-skew-only-rev", value:"lg-slide-skew-only-rev"},
            {label:"lg-slide-skew-only-y", value:"lg-slide-skew-only-y"},
            {label:"lg-slide-skew-only-y-rev", value:"lg-slide-skew-only-y-rev"},
            {label:"lg-slide-skew", value:"lg-slide-skew"},
            {label:"lg-slide-skew-rev", value:"lg-slide-skew-rev"},
            {label:"lg-slide-skew-cross", value:"lg-slide-skew-cross"},
            {label:"lg-slide-skew-cross-rev", value:"lg-slide-skew-cross-rev"},
            {label:"lg-slide-skew-ver", value:"lg-slide-skew-ver"},
            {label:"lg-slide-skew-ver-rev", value:"lg-slide-skew-ver-rev"},
            {label:"lg-slide-skew-ver-cross", value:"lg-slide-skew-ver-cross"},
            {label:"lg-slide-skew-ver-cross-rev", value:"lg-slide-skew-ver-cross-rev"},
            {label:"lg-lollipop", value:"lg-lollipop"},
            {label:"lg-lollipop-rev", value:"lg-lollipop-rev"},
            {label:"lg-rotate", value:"lg-rotate"},
            {label:"lg-rotate-rev", value:"lg-rotate-rev"},
            {label:"lg-tube", value:"lg-tube"}
            ];

        this._handleAutoplayChange = this._handleAutoplayChange.bind(this);
        this._handleAnimationChange = this._handleAnimationChange.bind(this);
        this._renderAutoplayDelay = this._renderAutoplayDelay.bind(this);
        this.messages = Language.getDataByKey("novi-plugin-light-gallery");
    }

    render() {
        return (
            <div className="lightgallery-group-wrap" style={{
                    "padding": "0 12px",
                    "display": "flex",
                    "flexDirection": "column",
                    "justifyContent": "center",
                    "height": "100%",
                    "color": "#6E778A"
                }}>
                <style>{this.style}</style>
                <p className="novi-label" style={{"marginTop": "0"}}>
                    {this.messages.editor.group.body.animation}
                </p>
                <Select searchable={false} options={this.animations} value={this.state.animation} onChange={this._handleAnimationChange}/>
                <div className="lightgallery-group">
                    <div className="lightgallery-group-switcher">
                        <p className="novi-label" style={{"margin": 0, "paddingRight": "4px"}}>
                            {this.messages.editor.group.body.thumbnails}
                        </p>
                        <Switcher isActive={this.state.thumbnail} onChange={this._handleSwitcherChange.bind(this, "thumbnail")}/>
                    </div>

                    <div className="lightgallery-group-switcher">
                        <p className="novi-label" style={{"margin": 0, "paddingRight": "4px"}}>
                            {this.messages.editor.group.body.loop}
                        </p>
                        <Switcher isActive={this.state.loop} onChange={this._handleSwitcherChange.bind(this, "loop")}/>
                    </div>

                    <div className="lightgallery-group-switcher">
                        <p className="novi-label" style={{"margin": 0, "paddingRight": "4px"}}>
                            {this.messages.editor.group.body.autoplay}
                        </p>
                        <Switcher isActive={this.state.autoplay} onChange={this._handleSwitcherChange.bind(this, "autoplay")}/>

                    </div>
                </div>
                {this._renderAutoplayDelay()}
            </div>

        )
    }

    _handleAutoplayChange(value) {
        this.setState({
            autoplayTime: value
        });
    }

    _handleSwitcherChange(key, isActive) {
        let state = Object.assign({}, this.state);
        state[key] = isActive;
        if (key === "autoplay"){
            if (isActive){
                novi.editor.setBodyHeight(180);
            }
            else{
                novi.editor.setBodyHeight(140);
            }
        }
        this.setState(state);
    }

    _handleAnimationChange(value){
        this.setState({
            animation: value
        });
    }

    _renderAutoplayDelay() {
        const switcherClass = this.state.autoplay ? "lightgallery-group-switcher": "lightgallery-group-switcher disabled";
        return (
            <div className={switcherClass}>
                <p className="novi-label" style={{"margin": 0}}>
                    {this.messages.editor.group.body.autoplayDelay}
                </p>
                <div style={{"width": "80px"}}>
                    <InputNumber onChange={this._handleAutoplayChange} value={this.state.autoplayTime} min={0} />
                </div>

            </div>
        )
    }
}