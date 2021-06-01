const container = document.querySelector('#dog-image-container')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
const ulContainer = document.querySelector('#dog-breeds');
const dropDown = document.querySelector("#breed-dropdown")
let breedsArray;

ulContainer.addEventListener('click', handleClick);
dropDown.addEventListener('change', handleChange);

function getImages(){
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(images => {
    const imgs = images.message; // takes message content (urls)
    let imgsArray = createImgElement(imgs);
    renderElement(imgsArray)
  })
}
  
// adds element into container 
function createImgElement(imgs){
  return imgs.map((img) => { // creates image tags and assisns to variable
    let i = `<img src=${img}>`;
    return i;
  })
}
function renderImgs(imgsArray){
  imgsArray.forEach(element => {
    renderElement(element);
  })
}
  
function renderElement(element){
  ulContainer.innerHTML += element
}

function getBreeds(){
  fetch(breedUrl)
  .then(resp => resp.json())
  .then(breeds => {
    breedsArray = Object.keys(breeds.message);
    const breedsLis = createLiElement(breedsArray);
    renderLis(breedsLis);
  })
}
function createLiElement(breedsArray){
  return breedsArray.map((breed) => { // creates image tags and assisns to variable
    let li = `<li>${breed}</li>`;
    return li;
  })
}
function renderLis(breedsLis){
  breedsLis.forEach(element => {
    renderElement(element);
  })
}

function handleClick(event){
  if (event.target.nodeName === 'LI'){
    if (event.target.style.color === 'red') {
      event.target.style.color = 'black';
    } else {
      event.target.style.color = 'red';
    }
  }
}

function handleChange(event){
  const letter = event.target.value
  const filteredBreeds = breedsArray.filter(breed => breed.startsWith(letter));
  const filteredBreedsLis = createLiElement(filteredBreeds);
  ulContainer.innerHTML = '';
  renderLis(filteredBreedsLis);
  
}

getImages()
getBreeds()

