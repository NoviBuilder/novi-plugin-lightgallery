const React = novi.react.React;
const Component = novi.react.Component;
const Link = novi.ui.link;
import * as Utils from "../Utils";

export default class Body extends Component {
    constructor(props) {
        super(props);
        let items = JSON.parse(novi.element.getAttribute(props.element, 'data-lg-dynamic-elements')) || null;
        this.state = {
            items,
            initValue: {
                items
            },
            element: props.element
        };

        this.style = `
            .lightgallery-album-add-item{
                display: flex;
                align-items: center;
                height: 35px;
                justify-content: flex-end;
                padding: 15px;
                box-sizing: border-box;
            }
            .lightgallery-album-inner{
                height: calc(100% - 35px);
                overflow-y: scroll;
            }
            .lightgallery-album-inner::-webkit-scrollbar {
                width: 8px;
                height: 8px;
                background: #181D27;
            }
            .lightgallery-album-inner::-webkit-scrollbar-thumb {
                height: 6px;
                width: 6px;
                border: 2px solid rgba(0, 0, 0, 0);
                background-clip: padding-box;
                -webkit-border-radius: 4px;
                background-color: #109DF7;
            }
            .lightgallery-album-inner::-webkit-scrollbar-button {
                width: 0;
                height: 0;
                display: none;
            }
            .lightgallery-album-inner::-webkit-scrollbar-corner {
                background-color: transparent;
            }
            .lightgallery-album{
                width: 100%;
                font-size: 0;
                margin-top: -10px;
                margin-left: -10px;
                box-sizing: border-box;
            }
            .lightgallery-album-item{ 
                width: 150px;
                height: 120px;
                background: #000;
                display: inline-block;
                margin-left: 10px;
                margin-top: 10px;
                cursor: pointer;
                position: relative;
            }
            .lightgallery-album-item-image{
                width: 100%;
                height: 100%;
                background-size: contain;
                -webkit-background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                display: block;
            }
            .lightgallery-album-item-fallback-image{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
            .lightgallery-album-item-fallback-image svg{
                width: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                fill: #1F2532;
            }
            .lightgallery-album-item-hover-wrap{
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: default;
                opacity: 0;
                visibility: hidden;
                -webkit-transition: 0.15s opacity cubic-bezier(0.4, 0, 1, 1);
                transition: 0.15s opacity cubic-bezier(0.4, 0, 1, 1);
            }
            .lightgallery-album-item-settings{
                width: 20px;
                height: 20px;
                display: block;
                cursor: pointer;
            }
            .lightgallery-album-item-settings svg,
            .lightgallery-album-item-remove svg{
                width: 100%;
                fill: #fff;
                -webkit-transition: 0.15s fill cubic-bezier(0.4, 0, 1, 1);
                transition: 0.15s fill cubic-bezier(0.4, 0, 1, 1);
            }
            .lightgallery-album-item-settings:hover svg{
                fill: #109DF7;
            }
            .lightgallery-album-item-remove:hover svg{
                fill: #ce3849;
            }
            .lightgallery-album-item-remove{
                width: 20px;
                display: block;
                height: 20px;
                margin-left: 15px;
                cursor: pointer;
            }
            .lightgallery-album-item:hover .lightgallery-album-item-hover-wrap{
                visibility: visible;
                opacity: 1; 
            }
            
        `;
        this._renderGalleryItems = this._renderGalleryItems.bind(this);
        this._onItemAdd = this._onItemAdd.bind(this);
    }

    render() {
        return (
            <div className="lightgallery-album-wrap" style={{
                "height": "100%",
                "boxSizing": "border-box",
                "padding": "15px 3px 0 15px",
                "background": "#181D27"
            }}>
                <style>{this.style}</style>
                <div className="lightgallery-album-inner">
                    <div className="lightgallery-album">
                        {this._renderGalleryItems()}
                    </div>
                </div>
                <div className="lightgallery-album-add-item">
                    <Link type="primary" onClick={this._onItemAdd}>Add gallery item</Link>
                </div>
            </div>

        )
    }

    _renderGalleryItems(){
        return (
            this.state.items.map((item, index)=>{
                if (!item.thumb){
                    return this._renderItemByLinkType(item, index);
                }
                else {
                    return(
                        <div key={`${item.thumb}${new Date().getTime()}-${index}`} className="lightgallery-album-item">
                            <span className="lightgallery-album-item-image" style={{backgroundImage: `url("${item.thumb}")`}}></span>
                            {this._renderControls(index)}
                        </div>
                    )
                }

            })
        )
    }

    _renderItemByLinkType(item, index){
        console.log(item);
        let mediaObj = Utils.getLinkType(item.src);
        console.log(mediaObj);
        switch (mediaObj.type){
            case "image":
                return (
                    <div key={`${item.src}${new Date().getTime()}-${index}`} className="lightgallery-album-item">
                        <span className="lightgallery-album-item-image" style={{backgroundImage: `url("${item.src}")`}}></span>
                        {this._renderControls(index)}
                    </div>
                );
            case "video":
            case "youtube":
            case "vimeo":
                return (
                    <div key={`${item.src}${new Date().getTime()}-${index}`} className="lightgallery-album-item">
                        <span className="lightgallery-album-item-fallback-image">
                            <svg viewBox="0 0 20 20">
                                <path d="M7.5 15c-0.076 0-0.153-0.017-0224-0.053-0.169-0.085-0.276-0.258-0.276-0.447v-9c0-0.189 0.107-0.363 0.276-0.447s0.372-0.066 0.524 0.047l6 4.5c0.126 0.094 0.2 0.243 0.2 0.4s-0.074 0.306-0.2 0.4l-6 4.5c-0.088 0.066-0.194 0.1-0.3 0.1zM8 6.5v7l4.667-3.5-4.667-3.5z"/>
                                <path d="M19.5 2h-19c-0.276 0-0.5 0.224-0.5 0.5v15c0 0.276 0.224 0.5 0.5 0.5h19c0.276 0 0.5-0.224 0.5-0.5v-15c0-0.276-0.224-0.5-0.5-0.5zM3 11h-2v-2h2v2zM3 8h-2v-2h2v2zM1 12h2v2h-2v-2zM4 3h12v14h-12v-14zM17 9h2v2h-2v-2zM17 8v-2h2v2h-2zM17 12h2v2h-2v-2zM19 5h-2v-2h2v2zM3 3v2h-2v-2h2zM1 15h2v2h-2v-2zM17 17v-2h2v2h-2z"/>
                            </svg>
                        </span>
                        {this._renderControls(index)}
                    </div>
                );
            case "url" :
                return(
                    <div key={`${item.src}${new Date().getTime()}-${index}`} className="lightgallery-album-item">
                        <span className="lightgallery-album-item-fallback-image">
                            <svg viewBox="0 0 20 20">
                                <path d="M10.682 12.998c-0.943 0-1.886-0.359-2.604-1.077-0.195-0.195-0.195-0.512 0-0.707s0.512-0.195 0.707 0c1.046 1.046 2.747 1.046 3.793 0l3.636-3.636c1.046-1.046 1.046-2.747 0-3.793s-2.747-1.046-3.793 0l-3.068 3.068c-0.195 0.195-0.512 0.195-0.707 0s-0.195-0.512 0-0.707l3.068-3.068c1.436-1.436 3.772-1.436 5.207 0s1.436 3.772 0 5.207l-3.636 3.636c-0.718 0.718-1.661 1.077-2.604 1.077z"/>
                                <path d="M4.682 18.998c-0.943 0-1.886-0.359-2.604-1.077-1.436-1.436-1.436-3.772 0-5.207l3.636-3.636c1.436-1.436 3.772-1.436 5.207 0 0.195 0.195 0.195 0.512 0 0.707s-0.512 0.195-0.707 0c-1.046-1.046-2.747-1.046-3.793 0l-3.636 3.636c-1.046 1.046-1.046 2.747 0 3.793s2.747 1.046 3.793 0l3.068-3.068c0.195-0.195 0.512-0.195 0.707 0s0.195 0.512 0 0.707l-3.068 3.068c-0.718 0.718-1.661 1.077-2.604 1.077z"/>
                            </svg>
                        </span>
                        {this._renderControls(index)}
                    </div>
                )
        }
    }

    _renderControls(index){
        return (
            <span className="lightgallery-album-item-hover-wrap">
                <span className="lightgallery-album-item-settings">
                    <svg viewBox="0 0 20 20">
                        <path d="M7.631 19.702c-0.041 0-0.083-0.005-0.125-0.016-0.898-0.231-1.761-0.587-2.564-1.059-0.233-0.137-0.315-0.434-0.186-0.671 0.159-0.292 0.243-0.622 0.243-0.957 0-1.103-0.897-2-2-2-0.334 0-0.665 0.084-0.957 0.243-0.237 0.129-0.534 0.047-0.671-0.186-0.472-0.804-0.828-1.666-1.059-2.564-0.065-0.254 0.077-0.515 0.325-0.598 0.814-0.274 1.362-1.036 1.362-1.895s-0.547-1.621-1.362-1.895c-0.248-0.084-0.39-0.344-0.325-0.598 0.231-0.898 0.587-1.761 1.059-2.564 0.137-0.233 0.434-0.315 0.671-0.186 0.291 0.159 0.622 0.243 0.957 0.243 1.103 0 2-0.897 2-2 0-0.334-0.084-0.665-0.243-0.957-0.129-0.237-0.047-0.534 0.186-0.671 0.804-0.472 1.666-0.828 2.564-1.059 0.254-0.065 0.515 0.077 0.598 0.325 0.274 0.814 1.036 1.362 1.895 1.362s1.621-0.547 1.895-1.362c0.084-0.248 0.345-0.39 0.598-0.325 0.898 0.231 1.761 0.587 2.564 1.059 0.233 0.137 0.315 0.434 0.186 0.671-0.159 0.292-0.243 0.622-0.243 0.957 0 1.103 0.897 2 2 2 0.334 0 0.665-0.084 0.957-0.243 0.237-0.129 0.534-0.047 0.671 0.186 0.472 0.804 0.828 1.666 1.059 2.564 0.065 0.254-0.077 0.515-0.325 0.598-0.814 0.274-1.362 1.036-1.362 1.895s0.547 1.621 1.362 1.895c0.248 0.084 0.39 0.344 0.325 0.598-0.231 0.898-0.587 1.761-1.059 2.564-0.137 0.233-0.434 0.315-0.671 0.186-0.292-0.159-0.622-0.243-0.957-0.243-1.103 0-2 0.897-2 2 0 0.334 0.084 0.665 0.243 0.957 0.129 0.237 0.047 0.534-0.186 0.671-0.804 0.472-1.666 0.828-2.564 1.059-0.254 0.065-0.515-0.077-0.598-0.325-0.274-0.814-1.036-1.362-1.895-1.362s-1.621 0.547-1.895 1.362c-0.070 0.207-0.264 0.341-0.474 0.341zM10 17c1.127 0 2.142 0.628 2.655 1.602 0.52-0.161 1.026-0.369 1.51-0.622-0.108-0.314-0.164-0.646-0.164-0.98 0-1.654 1.346-3 3-3 0.334 0 0.666 0.056 0.98 0.164 0.253-0.484 0.462-0.989 0.622-1.51-0.974-0.512-1.602-1.527-1.602-2.655s0.628-2.142 1.602-2.655c-0.161-0.52-0.369-1.026-0.622-1.51-0.314 0.108-0.646 0.164-0.98 0.164-1.654 0-3-1.346-3-3 0-0.334 0.056-0.666 0.164-0.98-0.484-0.253-0.989-0.462-1.51-0.622-0.512 0.974-1.527 1.602-2.655 1.602s-2.142-0.628-2.655-1.602c-0.52 0.16-1.026 0.369-1.51 0.622 0.108 0.314 0.164 0.646 0.164 0.98 0 1.654-1.346 3-3 3-0.334 0-0.666-0.056-0.98-0.164-0.253 0.484-0.462 0.989-0.622 1.51 0.974 0.512 1.602 1.527 1.602 2.655s-0.628 2.142-1.602 2.655c0.16 0.52 0.369 1.026 0.622 1.51 0.314-0.108 0.646-0.164 0.98-0.164 1.654 0 3 1.346 3 3 0 0.334-0.056 0.666-0.164 0.98 0.484 0.253 0.989 0.462 1.51 0.622 0.512-0.974 1.527-1.602 2.655-1.602z"/>
                        <path d="M10 13c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zM10 8c-1.103 0-2 0.897-2 2s0.897 2 2 2c1.103 0 2-0.897 2-2s-0.897-2-2-2z"/>
                    </svg>
                </span>
                <span className="lightgallery-album-item-remove" onClick={this._removeItem.bind(this, index)}>
                    <svg viewBox="0 0 20 20">
                        <path d="M14.332 14.126l-4.080-3.626 4.080-3.626c0.206-0.183 0.225-0.499 0.042-0.706s-0.499-0.225-0.706-0.042l-4.168 3.705-4.168-3.705c-0.206-0.183-0.522-0.165-0.706 0.042s-0.165 0.522 0.042 0.706l4.080 3.626-4.080 3.626c-0.206 0.183-0.225 0.499-0.042 0.706 0.099 0.111 0.236 0.168 0.374 0.168 0.118 0 0.237-0.042 0.332-0.126l4.168-3.705 4.168 3.705c0.095 0.085 0.214 0.126 0.332 0.126 0.138 0 0.275-0.057 0.374-0.168 0.183-0.206 0.165-0.522-0.042-0.706z"/>
                        <path d="M9.5 20c-2.538 0-4.923-0.988-6.718-2.782s-2.782-4.18-2.782-6.717c0-2.538 0.988-4.923 2.782-6.718s4.18-2.783 6.718-2.783c2.538 0 4.923 0.988 6.718 2.783s2.782 4.18 2.782 6.718-0.988 4.923-2.782 6.717c-1.794 1.794-4.18 2.782-6.718 2.782zM9.5 2c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5z"/>
                    </svg>
                </span>
            </span>
        )
    }

    _removeItem(index) {
        let items = this.state.items.slice();
        items.splice(index, 1);
        this.setState({
            items
        })
    }

    _onItemAdd(){
        let items = this.state.items.slice();
        items.push({src: null, subHtml: null});
        this.setState({
            items
        })
    }
}