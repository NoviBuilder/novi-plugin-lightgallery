import GalleryItemSettings from "../GalleryItemSettings";
import * as Utils from "../Utils";

const React = novi.react.React;
const Component = novi.react.Component;

export default class Body extends Component {
    constructor(props) {
        super(props);
        let link = "", caption = "", captionElement, videoElement;

        const baseElement = props.element.ownerDocument.head.querySelector('base');
        this.dir = baseElement.getAttribute("href");

        // Getting Original link
        if (props.childElement.tagName === 'A' && props.childElement.hasAttribute("href")) {
            link = novi.element.getAttribute(props.childElement, "href");
        } else if (props.childElement.hasAttribute("data-src")) {
            link = novi.element.getAttribute(props.childElement, "data-src");
        } else if (props.childElement.hasAttribute("data-html")) {
            let videoSelector = novi.element.getAttribute(props.childElement, "data-html");

            // Try to find video childElement
            try {
                videoElement = props.childElement.ownerDocument.querySelector(videoSelector + " video");
            } catch (e) {
                videoElement = null;
            }

            if (videoElement) {
                if (videoElement.hasAttribute('src')) {
                    link = videoElement.getAttribute('src');
                } else {
                    let source = videoElement.querySelector('source');
                    if (source) link = source.getAttribute("src");
                }
            }
        }

        // Getting Caption
        if (props.childElement.hasAttribute("data-sub-html")) {
            let captionValue = props.childElement.getAttribute('data-sub-html');
            let isSelector = true;
            try {
                props.childElement.matches(captionValue);
            } catch (e) {
                isSelector = false;
            }

            if (isSelector) {
                let captionEl;
                if (props.element.getAttribute("data-sub-html-relative") === "true") {
                    captionEl = props.childElement.querySelector(captionValue);
                } else {
                    captionEl = props.childElement.ownerDocument.querySelector(captionValue);
                }
                if (captionEl) {
                    captionElement = captionEl;
                    captionEl = novi.element.getStaticReference(captionEl);
                    caption = captionEl.innerHTML;
                } else {
                    caption = captionValue;
                }
            } else {
                caption = captionValue;
            }
        }

        this.onItemChange = this.onItemChange.bind(this);

        let result = Utils.getLinkType(link);

        this.state = {
            element: props.element,
            childElement: props.childElement,
            type : result.type,
            videoId: result.id,
            videoElement, captionElement,
            link, caption,
            initData:{
                link: link,
                caption: caption,
                type: result.type
            }
        };

    }

    render() {
        return (
            <div
                className="lg-wrap" style={{
                "padding": "0 12px",
                "display": "flex",
                "flexDirection": "column",
                "justifyContent": "center",
                "height": "100%",
                "color": "#6E778A"
            }}
            >
                <GalleryItemSettings src={this.state.link} caption={this.state.caption} type={this.state.type} videoId={this.state.videoId} onChange={this.onItemChange} relativeDir={this.dir}/>
            </div>

        )
    }

    onItemChange(data){
        this.setState({
            link: data.src,
            caption: data.caption,
            type: data.type
        })
    }
}