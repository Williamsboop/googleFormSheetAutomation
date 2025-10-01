const ARR = ['Digital Advertising', 'Print Advertising', 'Website Creation', 'Podcast Production',];
let [min, max] = [1, ARR.length  + 1];
let randomizedArr = ARR.slice(0, Math.random() * (max - min) + min);

function display(arr) {
    let arrLen = arr.length;
    switch(arrLen) {
        case 1:
            console.log(`The user is interested in ${arr[0]}.`);
            break;
        default:
            let lastElm = arr.pop();
            if (arrLen > 2){
                console.log(`The user is interested in ${arr.join()},and ${lastElm}.`.replace(/,/g, ', '));
            } else {
                console.log(`The user is interested in ${arr.join()} and ${lastElm}.`);
            }
    }
}

display(randomizedArr)