function ToNumber() {
    this.addInput('', 0);
    this.addOutput('', 'number');
    this.size = [170, 30];
}

ToNumber.title = 'ToNumber';

ToNumber.prototype.onExecute = function () {
    let input = this.getInputData(0);
    if (!input) {
        this.value = 0;
    } else {
        this.value = parseInt(input);
    }
    this.setOutputData(0, this.value);
};

export default ToNumber;
