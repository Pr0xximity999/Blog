var images = [
    'jiggy.gif',
    'tf2naked.gif',
    'eye.jpg',
    'snugbugrug.jpg',
    'hand.jpg',
]
var div = document.getElementById('gifDrawer');

images.forEach(image => {
    var img = new Image();
    img.src = 'imageDrawer/' + image;
    img.className = 'gifDrawerImages';
    div.appendChild(img);

});

