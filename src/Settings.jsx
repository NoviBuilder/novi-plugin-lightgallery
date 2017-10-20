const React = novi.react.React;
const Component = novi.react.Component;
const Input = novi.ui.input;
const Button = novi.ui.button;

export default class ImageSettings extends Component {
    constructor(props) {
        super();
        this.state = {
            settings: props.settings
        };
        this.saveSettings = this.saveSettings.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            settings: props.settings
        })
    }

    render() {
        return (
            <div>
                <span style={{letterSpacing: "0,0462em"}}>Light Gallery Plugin</span>
                <div style={{fontSize: 13, color: "#6E778A", marginTop: 21}}>Apply this plugin to lighgallery group which are
                    matching selector:
                </div>
                <Input
                    style={{marginTop: 10, width: 340}} value={this.state.settings.groupQuerySelector}
                    onChange={this.onChange.bind(this, 'groupQuerySelector')}
                />
                <div style={{fontSize: 13, color: "#6E778A", marginTop: 21}}>Apply this plugin to lighgallery album which are
                    matching selector:
                </div>
                <Input
                    style={{marginTop: 10, width: 340}} value={this.state.settings.albumQuerySelector}
                    onChange={this.onChange.bind(this, 'albumQuerySelector')}
                />
                <div style={{marginTop: 30}}>
                    <div style={{fontSize: 13, color: "#6E778A", marginTop: 21}}>Apply this plugin to lighgallery item which are
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
        settings.querySelector = `${settings.groupQuerySelector}, ${settings.albumQuerySelector}, ${settings.childQuerySelector}`;
        this.setState({
            settings
        })
    }

    saveSettings() {
        novi.plugins.settings.update("novi-plugin-light-gallery", this.state.settings);
    }
}