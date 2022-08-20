//Fetch and place four dog images
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

const imgFetch = fetch(imgUrl)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for(let i = 0; i < data.message.length; i++) {
        let dogImg = document.createElement('img');
        dogImg.src = data.message[i];
        document.querySelector('div').appendChild(dogImg);
    }
  });

//fetch and place dog breeds
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

const breedFetch = fetch(breedUrl)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    for(let i = 0; i < Object.keys(data.message).length; i++) {
        let dogBreed = document.createElement('li');
        dogBreed.id = `breed${[i]}`;
        dogBreed.textContent = Object.keys(data.message)[i];
        dogBreed.className = 'breed';
        document.querySelector('ul').appendChild(dogBreed);
    }
});

//change breed name color
Promise.all([imgFetch, breedFetch]).then(function() {
    const breedList = document.querySelectorAll('li');
    const numberBreeds = breedList.length;
    for(let i = 0; i < numberBreeds; i++) {
        breedList[i].addEventListener('click', function () {
            if(breedList[i].style.color === 'red') {
                breedList[i].style.color = 'black';
            } else {
                breedList[i].style.color = 'red';
            }
        });
    }
    //Filter breed
    const dropDown = document.querySelector('select');
    
    const opt = document.createElement('option');
    opt.value = '-';
    opt.textContent = '-';
    opt.selected = 'selected';
    dropDown.prepend(opt);

    dropDown.addEventListener('change', () => {
        const filterLetter = dropDown.value;
        for(let i = 0; i < numberBreeds; i++) {
            let breedName = breedList[i].textContent;
            if(filterLetter !== '-') {
                if(breedName.slice(0,1) !== filterLetter) {
                    breedList[i].hidden = true;
                } else {
                    breedList[i].hidden = false;
                }
            } else {
                breedList[i].hidden = false;
            }
        }
    })
     
});