var Switch = React.createClass({
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx',
        'spa/ghostLoader.jsx'
    ],
    max() {
        window.walletAddress && this.controller.getBalanceOf().then(balance => (this.input.value = window.fromDecimals(balance, 18, true)) && this.onChange());
    },
    approve(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        if (e.currentTarget.className.indexOf("active") === -1 || (this.state && this.state.switching) || (this.state && this.state.approving)) {
            return;
        }
        this.controller.approve();
    },
    switch(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        if (e.currentTarget.className.indexOf("active") === -1 || (this.state && this.state.switching) || (this.state && this.state.approving)) {
            return;
        }
        this.controller.switchOperation(this.input.value.split(',').join(''));
    },
    onChange() {
        if (!this.input || !this.switchFinal) {
            return;
        }
        this.switchFinal.innerHTML = '0';
        var value = this.input.value.split(',').join('');
        if (isNaN(parseFloat(value))) {
            return;
        }
        if (!this.props.currentSlot) {
            return;
        }
        value = window.toDecimals(value, 18);
        value = window.web3.utils.toBN(value).mul(window.web3.utils.toBN(this.props.currentSlot[1])).div(window.web3.utils.toBN(this.props.currentSlot[2]));
        this.switchFinal.innerHTML = window.fromDecimals(value, 18);
    },
    connect(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        var _this = this;
        this.setState({connecting: true});
        window.ethereum.enable().then(() => window.getAddress()).then(() => {
            _this.emit('ethereum/ping');
            _this.setState({connecting : null});
        });
    },
    render() {
        var _this = this;
        if (this.props.startBlock >= this.props.currentBlock) {
            return (<section className="switchBox">
                <h3>Switch</h3>
                <section className="switchTools">
                    <h4>The Switch will be available at block <a target="_blank" href={window.getNetworkElement("etherscanURL") + "block/countdown/" + this.props.startBlock}>#{this.props.startBlock}</a></h4>
                </section>
            </section>);
        }
        return (<section>
            <section className="switchBox">
                {this.props.currentSlot && window.walletAddress && [
                <h3>Switch</h3>,
                <section className="switchTools">
                    <a href="javascript:;" className="switchAll" onClick={this.max}>Max</a>
                    <input type="text" ref={ref => (this.input = ref) && (ref.value = window.fromDecimals(this.props.balanceOf, 18, true)) && this.onChange()} onChange={this.onChange} />
                    <a className="switchLink" href={window.getNetworkElement("etherscanURL") + "token/" + window.oldToken[this.props.i].token.options.address} target="_blank">${window.oldToken[this.props.i].symbol}<b> {this.props.i === 0 ? "V1" : "V2"}</b></a>
                    <img src={window.oldToken[this.props.i].logo} />
                </section>,
                <h3>For</h3>,
                <section className="switchTools">
                    <span ref={ref => (this.switchFinal = ref) && this.onChange()} className="switchFinal">0</span>
                    <a className="switchLink" href={window.getNetworkElement("etherscanURL") + "token/" + this.props.newVotingTokenAddress} target="_blank">${window.newToken.symbol}<b> V3</b></a>
                    <img src={window.newToken.logo} />
                </section>]}
                <section className="switchActions">
                    {!this.props.currentSlot && <Loader />}
                    {this.props.currentSlot && window.walletAddress && <a href="javascript:;" className={"switchAction" + (!this.props.approved ? " active" : "")} onClick={this.approve}>{this.state && this.state.approving && <GhostLoader/>}{(!this.state || !this.state.approving) && "Approve"}</a>}
                    {this.props.currentSlot && window.walletAddress && <a href="javascript:;" className={"switchAction" + (this.props.approved ? " active" : "")} onClick={this.switch}>{this.state && this.state.switching && <GhostLoader/>}{(!this.state || !this.state.switching) && "Switch"}</a>}
                    {this.props.currentSlot && !window.walletAddress && <a href="javascript:;" onClick={this.connect} className="switchAction active">{this.state && this.state.connecting && <GhostLoader/>}{(!this.state || !this.state.connecting) && "Connect"}</a>}
                </section>
                {this.props.currentSlot && window.walletAddress && <p>Current Switch bonus is <b>X{window.numberToString(parseInt(this.props.currentSlot[1]) / parseInt(this.props.currentSlot[2]))}</b> until the block n. <a href={window.getNetworkElement("etherscanURL") + "block/" + this.props.currentSlot[0]} target="_blank">{this.props.currentSlot[0]}</a></p>}
                {this.props.currentSlot && window.walletAddress && <p>Disclamer: Switching ${window.oldToken[this.props.i].symbol} V{this.props.i === 0 ? "1" : "2"} to ${window.newToken.symbol} V3 is an irreversible action, do it at your own risk</p>}
            </section>
        </section>);
    }
});