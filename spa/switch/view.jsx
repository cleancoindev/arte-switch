var Switch = React.createClass({
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],
    max() {
        window.walletAddress && this.props.balanceOf && this.controller.getBalanceOf().then(balance => this.input.value = window.fromDecimals(balance, 18, true));
        this.onChange();
    },
    approve(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        if(e.currentTarget.className.indexOf("active") === -1) {
            return;
        }
        this.controller.approve();
    },
    switch(e) {
        e && e.preventDefault && e.preventDefault(true) && e.stopPropagation && e.stopPropagation(true);
        if(e.currentTarget.className.indexOf("active") === -1) {
            return;
        }
        this.controller.switchOperation(this.input.value);
    },
    onChange() {
        if(!this.input || !this.switchFinal) {
            return;
        }
        this.switchFinal.innerHTML = '0';
        var value = this.input.value;
        if(isNaN(parseInt(value))) {
            return;
        }
        if(!this.props.currentSlot) {
            return;
        }
        value = window.toDecimals(value, 18);
        value = window.web3.utils.toBN(value).mul(window.web3.utils.toBN(this.props.currentSlot[1])).div(window.web3.utils.toBN(this.props.currentSlot[2]));
        this.switchFinal.innerHTML = window.fromDecimals(value, 18);
    },
    render() {
        var _this = this;
        return (<section>
            <section className="switchBox">
            <h3>Switch</h3>
                <section className="switchTools">
                    <a href="javascript:;" className="switchAll" onClick={this.max}>Max</a>
                    <input type="number" ref={ref => (this.input = ref) && (ref.value = window.fromDecimals(this.props.balanceOf, 18)) && this.onChange()} onChange={this.onChange}/>
                    <a className="switchLink" href={window.getNetworkElement("etherscanURL") + "token/" + window.oldToken.token.options.address} target="_blank">${window.oldToken.symbol}<b> V1</b></a>
                    <img src={window.oldToken.logo}/>
                </section>
            <h3>For</h3>
                <section className="switchTools">
                    <span ref={ref => (this.switchFinal = ref) && this.onChange()} className="switchFinal">0</span>
                    <a className="switchLink" href={window.getNetworkElement("etherscanURL") + "token/" + this.props.newVotingTokenAddress} target="_blank">${window.newToken.symbol}<b> V2</b></a>
                    <img src={window.newToken.logo}/>
                </section>
                <section className="switchActions">
                    {!this.props.currentSlot && <Loader/>}
                    {this.props.currentSlot && window.walletAddress && <a href="javascript:;" className={"switchAction" + (!this.props.approved ? " active" : "")} onClick={this.approve}>Approve</a>}
                    {this.props.currentSlot && window.walletAddress && <a href="javascript:;" className={"switchAction" + (this.props.approved ? " active" : "")} onClick={this.switch}>Switch</a>}
                    {this.props.currentSlot && !window.walletAddress && <a href="javascript:;" onClick={() => window.ethereum.enable().then(() => window.getAddress()).then(() => _this.emit('ethereum/ping'))} className="switchAction active">Connect</a>}
                </section>
                {this.props.currentSlot && <p>Current Switch bonus is <b>X{window.numberToString(parseInt(this.props.currentSlot[1]) / parseInt(this.props.currentSlot[2]))}</b> until the block n. <a href={window.getNetworkElement("etherscanURL") + "block/" + this.props.currentSlot[0]} target="_blank">{this.props.currentSlot[0]}</a></p>}
                {this.props.currentSlot && <p>Disclamer: Switching $BUIDL V1 to $buidl V2 is an irreversible action, do it at your own risk</p>}
            </section>
        </section>);
    }
});