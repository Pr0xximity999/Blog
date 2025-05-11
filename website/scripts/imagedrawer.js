fetch("./assets/images/image-drawer/images.json")
    .then(response => response.json())
    .then(data => {
        var div = document.getElementById('gifDrawer2');
        data.forEach(image => {
            if(image.split('.')[1] !== 'json')
            {
                var img = new Image();
                img.src = `./assets/images/image-drawer/${image}`;
                img.className = 'gifDrawerImages';
                div.appendChild(img);
            }
        });
    })
    .catch(error => console.error("Error loading image json: " + error))





