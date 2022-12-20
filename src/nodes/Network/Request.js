function NetworkRequest() {
    this.addInput('[url]', 'string');
    this.addInput('[method]', 'string');
    this.addInput('[headers]', 'object');
    this.addInput('[body]', 'string');
    this.addInput('request', -1); //action
    this.addOutput('output', 'string');
    this.properties = {
        url: '',
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
        body: '',
        debounce: 1000,
    };
    this.size[0] = 280;
}

NetworkRequest.title = 'Request';

NetworkRequest.prototype.onAdded = function () {
    this.doRequest();
};

NetworkRequest.prototype.onAction = function (action, param) {
    this.doRequest();
};

NetworkRequest.prototype.onDrawBackground = function (ctx) {
    if (this.flags.collapsed) {
        return;
    }
    if (this.value) {
        this.outputs[0].label = this.value.length;
    }
};

NetworkRequest.prototype.onExecute = function () {
    let optionalUrl = this.getInputData(0);
    if (optionalUrl && optionalUrl != this.properties.url) {
        this.onPropertyChanged('url', optionalUrl);
    }
    let optionalMethod = this.getInputData(1);
    if (optionalMethod && optionalMethod != this.properties.method) {
        this.onPropertyChanged('method', optionalMethod);
    }
    let optionalHeaders = this.getInputData(2);
    if (optionalHeaders && optionalHeaders != this.properties.headers) {
        this.onPropertyChanged('headers', optionalHeaders);
    }
    let optionalBody = this.getInputData(3);
    if (optionalBody && optionalBody != this.properties.body) {
        this.onPropertyChanged('body', optionalBody);
    }
    this.setOutputData(0, this.value);
    this.outputs[0].type = typeof this.value;
};

NetworkRequest.prototype.onPropertyChanged = function (name, value) {
    this.properties[name] = value;
    if (name == 'url' && value != '') {
        this.doRequest();
    }
    return true;
};

NetworkRequest.prototype.doRequest = async function () {
    if (this.properties.url == '') {
        this.value = null;
        return;
    }
    if (this.lastRequestTime) {
        //skip making the request if multiple calls come in within the debounce period
        let lastTimeAgo = Date.now() - this.lastRequestTime;
        if (lastTimeAgo < this.properties.debounce) {
            return;
        }
    }
    this.lastRequestTime = Date.now();
    try {
        let requestOptions = {
            method: this.properties.method,
            headers: this.properties.headers,
            body: this.properties.body,
        };
        if (
            this.properties.method.toLowerCase() == 'get' ||
            this.properties.method.toLowerCase() == 'head'
        ) {
            delete requestOptions.body;
        }
        let result = await fetch(this.properties.url, requestOptions);
        let resOut = await result.text();
        if (resOut) {
            this.value = resOut;
        }
    } catch (e) {}
};

export default NetworkRequest;
