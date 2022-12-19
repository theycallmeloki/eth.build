// image node for displaying the base64 encoded image

function Image() {
    this.addInput('image', 'string');
    this.addOutput('image', 'string');
    this.properties = { width: 512, height: 512 };
    this.size = [this.properties.width + 20, this.properties.height + 20];
}

Image.title = 'Image';

Image.prototype.onExecute = function () {
    if (this.inputs[0]) {
        this.value = this.getInputData(0);
    }

    var image = this.getInputData(0);
    // if (image) {
    // this.properties.width = image.width;
    // this.properties.height = image.height;
    // this.size = [this.properties.width + 20, this.properties.height + 20];
    // }

    this.setOutputData(0, image);
};

Image.prototype.onDrawBackground = function (ctx) {
    var img = new Image();
    var image = this.getInputData(0);
    // if (image) {
    //     img.src = image;
    //     img.onload = function () {
    //         ctx.drawImage(img, this.properties.width, this.properties.height);
    //     };
    //     // console.log(image);
    //     console.log(img);
    // }
    img.src = image;

    this.render(
        <div>
            <img
                src={image}
                style={{
                    width: this.properties.width,
                    height: this.properties.height,
                }}
            />
        </div>,
    );
};

export default Image;
