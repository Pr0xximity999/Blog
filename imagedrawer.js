var num = 4;
var div = document.getElementById('gifDrawer');

console.log("\nFilenames in directory:"); 
for (let i = 1; i < num + 1; i++) {
    var img = new Image();
    if(ImageExist('imageDrawer/' + i + '.gif'))
    {
        img.src = 'imageDrawer/' + i + '.gif';
    }
    else if(ImageExist('imageDrawer/' + i + '.jpg'))
    {
        img.src = 'imageDrawer/' + i + '.jpg';
    }
    else if(ImageExist('imageDrawer/' + i + '.png'))
    {
        img.src = 'imageDrawer/' + i + '.png';
    }
    img.className = 'gifDrawerImages';
    div.appendChild(img);
}

function ImageExist(url) {
    if(url){
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.status==200;
    } else {
        return false;
    }
}