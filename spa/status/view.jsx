var Status = React.createClass({
    requiredScripts: [
        'spa/loader.jsx',
        'spa/bigLoader.jsx'
    ],
    renderData(index) {
        return (<section>
            <section className="statusBox">
                <h2>Flippening Watch</h2>
                <section className="statusTitle">
                    <section className="statusFlip">
                        <img src={window.oldToken[index].logo} />
                        <a>${window.oldToken[index].symbol} {index === 0 ? "V1" : "V2"}</a>
                        <h3>{window.fromDecimals(this.props["oldVotingTokenSupply" + index], 18)}</h3>
                        <h6>Circulating Supply</h6>
                    </section>
                    <section className="statusFlip">
                        <img src={window.newToken.logo} />
                        <a>${window.newToken.symbol} V3</a>
                        <h3>{window.fromDecimals(this.props.newVotingTokenSupply, 18)}</h3>
                        <h6>Circulating Supply</h6>
                    </section>
                </section>
            </section>
            <section className="statusBox">
                <h2>Switch Status:</h2>
                {this.props && this.props[index] && this.props[index].currentBlock < this.props[index].startBlock && [<h3>Start Block: <a href={window.getNetworkElement("etherscanURL") + "block/" + this.props[index].startBlock} target="_blank">{this.props[index].startBlock}</a></h3>, <br />]}
                <ul>
                    {this.props && this.props[index] && this.props[index].slots && this.props[index].slots.map((it, i) => <li key={i}>
                        <h1>x {window.numberToString(parseInt(it[1]) / parseInt(it[2]))}</h1>
                        <h5>End Block: <a href={window.getNetworkElement("etherscanURL") + "block/" + it[0]} target="_blank">{it[0]}</a></h5>
                        <h5>Status: {'\u00a0'} <a className={this.props[index].slots.indexOf(this.props[index].currentSlot) === i ? "Active" : this.props[index].currentBlock < this.props[index].startBlock || (this.props[index].currentSlot && this.props[index].slots.indexOf(this.props[index].currentSlot) < i) ? "Next" : "Ended"}>{this.props[index].slots.indexOf(this.props[index].currentSlot) === i ? "Active" : this.props[index].currentBlock < this.props[index].startBlock || (this.props[index].currentSlot && this.props[index].slots.indexOf(this.props[index].currentSlot) < i) ? "Next" : "Ended"}</a></h5>
                    </li>)}
                </ul>
            </section>
        </section>);
    },
    render() {
        return (<section>
            {this.renderData(0)}
            {this.renderData(1)}
        </section>);
    }
});