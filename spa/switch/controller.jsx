var SwitchController = function (view) {
    var context = this;
    context.view = view;

    context.switchOperation = async function switchOperation(value) {
        if(isNaN(parseFloat(value)) || parseFloat(value) < 0) {
            return alert("Please, insert an amount greater than zero");
        }
        value = window.toDecimals(value, 18);
        var valueInt = parseInt(value);
        var balanceOf = parseInt(await context.getBalanceOf());
        if(valueInt > balanceOf) {
            return alert("Inserted value is greater than your actual balance");
        }
        context.view.setState({approving: false, switching: true});
        try {
            await window.blockchainCall(window.vasaPowerSwitch[context.view.props.i].methods.vasaPowerSwitch, value);
            context.view.emit('ethereum/ping');
        } catch(e) {
            (e.message || e).toLowerCase().indexOf('user denied') === -1 && alert(e.message || e);
        }
        context.view.setState({approving: false, switching: false});
    };

    context.getBalanceOf = async function getBalanceOf() {
        return await window.blockchainCall(window.oldToken[context.view.props.i].token.methods.balanceOf, window.walletAddress);
    };

    context.approve = async function approve() {
        context.view.setState({approving: true, switching: false});
        try {
            await window.blockchainCall(window.oldToken[context.view.props.i].token.methods.approve, window.vasaPowerSwitch[context.view.props.i].options.address, await window.blockchainCall(window.oldToken[context.view.props.i].token.methods.totalSupply));
            context.view.emit('ethereum/ping');
        } catch(e) {
            (e.message || e).toLowerCase().indexOf('user denied') === -1 && alert(e.message || e);
        }
        context.view.setState({approving: false, switching: false});
    };
};