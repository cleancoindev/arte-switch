var Index = React.createClass({
    requiredModules: [
        "spa/info"
    ],
    requiredScripts: [
        'spa/bigLoader.jsx',
        'spa/loader.jsx'
    ],
    getInitialState() {
        return {
            element: "Info"
        };
    },
    getDefaultSubscriptions() {
        return {
            'ethereum/ping' : this.controller.loadData
        };
    },
    onClick(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        this.changeView(e.currentTarget.innerHTML, e.currentTarget.dataset.index);
    },
    changeView(element, index) {
        var _this = this;
        this.domRoot.children().find('a').removeClass("selected").each((i, it) => {
            if(it.innerHTML.toLowerCase() === element.toLowerCase()) {
                return $(it).addClass('selected');
            }
        });
        index === undefined && (index = null);
        element = element.split(' ')[0];
        ReactModuleLoader.load({
            modules : [
                'spa/' + element.toLowerCase()
            ],
            callback: function() {
                _this.setState({element, index});
            }
        });
    },
    componentDidMount() {
        this.controller.loadData();
    },
    render() {
        var props = {};
        this.props && Object.entries(this.props).forEach(entry => props[entry[0]] = entry[1]);
        this.state && Object.entries(this.state).forEach(entry => props[entry[0]] = entry[1]);
        props.props && Object.entries(props.props).forEach(entry => props[entry[0]] = entry[1]);
        delete props.props;
        if(props.index && props[props.index]) {
            Object.entries(props[props.index]).forEach(entry => props[entry[0]] = entry[1]);
        }
        return (
            <section className="OnePage">
                <header className="Head">
                    <section className="HBrand">
                        <h6>${window.newToken.symbol} Switch</h6>
                    </section>
                    <section className="HActions">
                        <a href={window.context.website} target="_blank">#{window.newToken.name}</a>
                        <a href={window.context.gitHubURL} target="_blank">#github</a>
                        <a href={window.getNetworkElement("etherscanURL") + "address/" + window.vasaPowerSwitch[0].options.address} target="_blank">#etherscan</a>
                    </section>
                </header>
                <section className="PagerMenu">
                    <ul className="Menu">
                        <a href="javascript:;" className="InfoOpener selected" onClick={this.onClick}>Info</a>
                        <a href="javascript:;" className="SwitchOpener" onClick={this.onClick} data-index="0">Switch V1/V3</a>
                        <a href="javascript:;" className="SwitchOpener" onClick={this.onClick} data-index="1">Switch V2/V3</a>
                        <a href="javascript:;" className="StakeOpener" onClick={this.onClick}>Status</a>
                    </ul>
                </section>
                {(!props[0] || !props[0].slots) && [<br/>, <Loader/>]}
                {props[0] && props[0].slots && React.createElement(window[this.state.element], props)}
            </section>
        );
    }
});