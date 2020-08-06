var Info = React.createClass({
    requiredScripts: [
        'spa/bigLoader.jsx'
    ],
    render() {
        return (
            <section>
                <section className="ExpTop">
                    <h1>Welcome to the ${window.newToken.symbol} Switch manager</h1>
                    <section className="ExpPar">
                        <p>Here you can migrate the old <b>${window.oldToken.symbol} V1</b> Governance Token of {window.newToken.name} <a href={window.getNetworkElement("etherscanURL") + "token/" + window.oldToken.address} target="_blank">{window.oldToken.address}</a> to the new <b>${window.newToken.symbol} V2</b> <a href={window.getNetworkElement("etherscanURL") + "token/" + this.props.newVotingTokenAddress} target="_blank">{this.props.newVotingTokenAddress}</a></p>
                    </section>
                    <section className="ExpPar">
                        <p><b>Disclamer:</b> Before trusting this website, make sure the URL is <a href={window.context.switchWebsite} target="_blank">{window.context.switchWebsite}</a></p>
                    </section>
                    <h2>This is the only official Switch service supported by the {window.newToken.name} Team.</h2>
                    <section className="ExpPar">
                        <p><a href={window.context.switchWebsite} target="_blank">{window.context.switchWebsite}</a> is an easy procedure to receive new ${window.newToken.symbol} V2 Voting tokens, by burning old one ${window.oldToken.symbol} V1 tokens.</p>
                    </section>
                    <section className="ExpPar">
                        <p>To receive your ${window.newToken.symbol} V2 tokens—burning your ${window.oldToken.symbol} V1 tokens in the process—all you need to do is navigate to the "Switch" section of this site, and follow these steps:  </p>
                    </section>
                    <section className="ExpPar">
                        <p>#1 Set the amount of ${window.oldToken.symbol} V1 you wish to switch.</p>
                        <p>#2 Approve the Switch by clicking the "Approve" button.</p>
                        <p>#3 Approve the transaction via your Web 3 provider (Metamask, TrustWallet, etc.). </p>
                        <p>#4 Start the Switch by clicking the "Switch" button.</p>
                        <p>#5 Approve the Ethereum transaction via your Web 3 provider (Metamask, TrustWallet, etc.).</p>
                        <p>#6 You’re done! Just wait for the Ethereum Transaction to complete, and the ${window.newToken.symbol} V2 tokens will be in your wallet!</p>
                    </section>
                    <h2>Incentives</h2>
                    <section className="ExpPar">
                        <p>During the Switch period, there are some bonuses for early switchers. You can find all information about this and the flippening in the "Status" section of this site. </p>
                    </section>
                    <section className="ExpPar">
                        <p><b>Disclamer:</b> ${window.oldToken.symbol} V1 will not be supported by the {window.newToken.name} team after 1st August 2020.</p>
                    </section>
                    <section className="ExpPar">
                        <p><b>Disclamer:</b> Switching ${window.oldToken.symbol} V1 to ${window.newToken.symbol} V2 is an irreversible action. Do it at your own risk.</p>
                    </section>
                </section>
            </section>
        );
    }
});