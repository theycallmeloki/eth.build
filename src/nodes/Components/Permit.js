function Permit() {
    this.addInput('holder', 'string');
    this.addInput('spender', 'string');
    this.addInput('nonce', 'string,number');
    this.addInput('expiry', 'string,number');
    this.addInput('allowed', 'string,number');
    this.addInput('', -1);
    this.addOutput('typedData', 'object');
    this.size[0] = 190;
}

Permit.title = 'Permit';

Permit.prototype.onAction = async function () {
    const message = {
        holder: this.holder,
        spender: this.spender,
        nonce: this.nonce,
        expiry: this.expiry,
        allowed:
            this.allowed == 'true' || this.allowed == 1 || this.allowed == '1'
                ? 'true'
                : 'false',
    };

    this.typedData = {
        types: {
            EIP712Domain: [
                {
                    name: 'name',
                    type: 'string',
                },
                {
                    name: 'version',
                    type: 'string',
                },
                {
                    name: 'chainId',
                    type: 'uint256',
                },
                {
                    name: 'verifyingContract',
                    type: 'address',
                },
            ],
            Permit: [
                {
                    name: 'holder',
                    type: 'address',
                },
                {
                    name: 'spender',
                    type: 'address',
                },
                {
                    name: 'nonce',
                    type: 'uint256',
                },
                {
                    name: 'expiry',
                    type: 'uint256',
                },
                {
                    name: 'allowed',
                    type: 'bool',
                },
            ],
        },
        primaryType: 'Permit',
        domain: {
            name: 'Dai Stablecoin',
            version: '1',
            chainId: '1',
            verifyingContract: '0x6B175474E89094C44Da98b954EedeAC495271d0F', //DAI ADDRESS
        },
        message: message,
    };

    /* = {
        typedData,
        message
    }*/
};

Permit.prototype.onExecute = function () {
    let changed = false;

    let holder = this.getInputData(0);
    if (holder != this.holder) {
        this.holder = holder;
        changed = true;
    }
    this.spender = this.getInputData(1);
    this.nonce = this.getInputData(2);
    this.expiry = this.getInputData(3);
    this.allowed = this.getInputData(4);
    if (changed) {
        this.onAction();
    }
    this.setOutputData(0, this.typedData);
};

export default Permit;
