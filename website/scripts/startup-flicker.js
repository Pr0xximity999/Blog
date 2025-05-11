//Get all elements with the cardbox class
let elements = document.getElementsByClassName("cardBox");

//Make everything invisible and put it in a list
let elementOrdered= [];
for(let element of elements)
{
    element.style.opacity = 0;
    elementOrdered.push(element)
}

//Shuffle the list
shuffle(elementOrdered);

let stagger_ms = 200;

for (let i = 0; i < elementOrdered.length; i++) {
    let offset_ms = (Math.random()-0.5) * 100 // -50 to 50 ms random offset
    
    //Fade in the element in order
    setTimeout(() => {
        flickerIn(elementOrdered[i]);
    }, (stagger_ms * i) + offset_ms)
}

//Method for fading in the element
function flickerIn(element){
    let duration_ms = ((Math.random() / 3 ) + 0.2) * 10000 //between 1000 and 3000 ms
    let tick = 0;
    let delay_ms = 30;
    let stepsize = 30;

    let flickered = false;
    //Choppy-ness of the fade; lower is more choppy
    let rounding = 10;

    //Flicker happens between 10% and 30% into the transition
    const stopFlickerAt = Math.random() * 0.2 + 0.1;
    let flickercount = 0;


    let interval = setInterval(() => {
        console.log(duration_ms)
        tick += (stepsize / duration_ms);
        if(!flickered && tick >= stopFlickerAt)
        {
            flickered = true;
            rounding = 1000;
            delay_ms = 5;
            stepsize *= 40;
            // const tmp = tick;
            // element.style.opacity = 0.8;
            //
            // setTimeout(() =>{
            //     element.style.opacity = tmp
            // }, 100)
        }
        if(!flickered && Math.random() < 0.4 && flickercount < 10)
        {
            //Set the opacity back a bit (flicker
            tick -= (stepsize / duration_ms) * 1.5;
            flickercount += 1;
        }

        if(tick >= 1)
        {
            tick = 1;
            clearInterval(interval);
        }
        element.style.opacity = Math.round(tick * rounding) / rounding;
    }, delay_ms);
}

//Stack overflow :P
function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}
