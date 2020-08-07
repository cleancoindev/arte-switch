var IndexController = function (view) {
    var context = this;
    context.view = view;

    context.loadData = async function loadData() {
        context.view.setState({
            newVotingTokenAddress : window.newToken.token.options.address,
            newVotingTokenSupply : await context.loadSupplies(window.newToken.token, window.context.newTokenExcludeAddresses),
            oldVotingTokenSupply0 : await context.loadSupplies(window.oldToken[0].token, window.context.oldTokenExcludeAddresses),
            oldVotingTokenSupply1 : await context.loadSupplies(window.oldToken[1].token, window.context.oldTokenExcludeAddresses)
        });

        for(var i = 0; i < 2; i++) {
            var currentBlock = parseInt(await window.web3.eth.getBlockNumber());
            var startBlock = parseInt(await window.blockchainCall(window.vasaPowerSwitch[i].methods.startBlock));
            var approved = !window.walletAddress ? false : parseInt(await window.blockchainCall(window.oldToken[i].token.methods.allowance, window.walletAddress, window.vasaPowerSwitch[i].options.address)) > 0;
            var balanceOf = !window.walletAddress ? '0' : await window.blockchainCall(window.oldToken[i].token.methods.balanceOf, window.walletAddress);
            var totalMintable = await window.blockchainCall(window.vasaPowerSwitch[i].methods.totalMintable);

            var state = {
                i,
                startBlock,
                currentBlock,
                approved,
                balanceOf,
                totalMintable
            };
            var stateInfo = (context.view.state && context.view.state.stateInfo) || {};
            stateInfo[i] = state;

            context.view.setState(stateInfo);

            var length = await window.blockchainCall(window.vasaPowerSwitch[i].methods.length);
            var slots = [];
            var currentSlot = null;
            for(var z = 0; z < length; z++) {
                var data = await window.blockchainCall(window.vasaPowerSwitch[i].methods.timeWindow, z);
                slots.push(data);
                currentBlock >= startBlock && !currentSlot && currentBlock <= parseInt(data[0]) && (currentSlot = data);
            }
            state.slots = slots;
            state.currentSlot = currentSlot;

            stateInfo[i] = state;

            context.view.setState(stateInfo);
        }
    };

    context.loadSupplies = async function loadSupplies(token, exclude) {
        try {
            var totalSupply = window.web3.utils.toBN(await window.blockchainCall(token.methods.totalSupply));
            if(exclude && exclude.length > 0) {
                for(var ex of exclude) {
                    totalSupply = totalSupply.sub(window.web3.utils.toBN(await window.blockchainCall(token.methods.balanceOf, ex)));
                }
            }
            return totalSupply.toString();
        } catch(e) {
            return '0';
        }
    };
};