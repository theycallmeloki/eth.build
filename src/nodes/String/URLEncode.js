// using encodeURIComponent on a string

function URLEncode() {
    this.addInput('string', 'string');
    this.addOutput('output', 'string');
    this.properties = {};
    this.value = 0;
    this.size[0] = 240;
    this.encodedValue = -1;
}

URLEncode.title = 'URL Encode';

URLEncode.prototype.onExecute = function () {
    if (this.inputs[0]) {
        this.value = this.getInputData(0);
    }
    if (this.value && this.value != this.encodedValue) {
        this.encodedValue = encodeURIComponent(this.value);
    }
    this.setOutputData(0, this.encodedValue);
};

export default URLEncode;
