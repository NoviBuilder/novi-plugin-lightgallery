const React = novi.react.React;
const Component = novi.react.Component;
const Input = novi.ui.input;
const Button = novi.ui.button;

export default class ImageSettings extends Component {
    constructor(props) {
        super();
        this.state = {
            settings: props.settings,
            childQuerySelector: props.childQuerySelector
        };
        this.saveSettings = this.saveSettings.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            settings: props.settings,
            childQuerySelector: props.childQuerySelector
        })
    }

    render() {
        return (
            <div>
                <span style={{letterSpacing: "0,0462em"}}>Background Image Plugin</span>
                <div style={{fontSize: 13, color: "#6E778A", marginTop: 21}}>Apply this plugin to elements which are
                    matching selector:
                </div>
                <Input
                    style={{marginTop: 10, width: 340}} value={this.state.settings.querySelector}
                    onChange={this.onChange.bind(this, 'querySelector')}
                />
                <div style={{marginTop: 30}}>
                    <div style={{fontSize: 13, color: "#6E778A", marginTop: 21}}>Apply this plugin to elements which are
                        matching selector:
                    </div>
                    <Input
                        style={{marginTop: 10, width: 340}} value={this.state.settings.childQuerySelector}
                        onChange={this.onChange.bind(this, 'childQuerySelector')}
                    />
                </div>
                <div style={{marginTop: 30}}>
                    <Button type="primary" messages={{textContent: "Save Settings"}} onClick={this.saveSettings}/>
                </div>
            </div>
        );
    }

    onChange(propertyName, e) {
        const value = e.target.value;
        let settings = this.state.settings;
        settings[propertyName] = value;
        this.setState({
            settings
        })
    }

    saveSettings() {
        novi.plugins.settings.update("novi-plugin-light-gallery", this.state.settings);
    }
}