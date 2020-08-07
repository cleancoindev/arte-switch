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
        try {
            await window.blockchainCall(window.vasaPowerSwitch[context.view.props.i].methods.vasaPowerSwitch, value);
            context.view.emit('ethereum/ping');
        } catch(e) {
            return alert(e.message || e);
        }
    };

    context.getBalanceOf = async function getBalanceOf() {
        return await window.blockchainCall(window.oldToken[context.view.props.i].token.methods.balanceOf, window.walletAddress);
    };

    context.approve = async function approve() {
        await window.blockchainCall(window.oldToken.token[context.view.props.i].methods.approve, window.vasaPowerSwitch.options.address, await window.blockchainCall(window.oldToken.token.methods.totalSupply));
        context.view.emit('ethereum/ping');
    };
};