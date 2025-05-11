var images = [
    'snugbugrug.jpg',
    'a_melhor_imagem_do_mundo.jpeg',
    'jiggy.gif',
    'poop-meeting-surprised.gif',
    'r4nhjdaz8kwb1.jpg',
    '58ekr0dl9lzb1.webp',
]
var div = document.getElementById('gifDrawer2');

images.forEach(image => {
    var img = new Image();
    img.src = `./assets/images/image-drawer/${image}`;
    img.className = 'gifDrawerImages';
    div.appendChild(img);
});




