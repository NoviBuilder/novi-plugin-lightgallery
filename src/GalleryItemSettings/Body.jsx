const React = novi.react.React;
const Component = novi.react.Component;

export default class Body extends Component {
    constructor(props) {
        super(props);


        this.state = {
           element: props.element
        };

    }

    render() {
        return (
            <div
                className="swiper-wrap" style={{
                "padding": "0 12px",
                "display": "flex",
                "flexDirection": "column",
                "justifyContent": "center",
                "height": "100%",
                "color": "#6E778A"
            }}
            >

            </div>

        )
    }
}