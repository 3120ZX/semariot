let level = 0
let apiUrl = `http://167.172.69.56:3000/api/telemetry/getSensors${level%2+1}`
const parks = document.getElementById('map')
const empty = document.getElementsByClassName('empty')
const searching = document.getElementsByClassName('searching')
const occupied = document.getElementsByClassName('occupied')
const dd_btn = document.getElementById('dropdown-btn')
const selected_level = document.getElementById('selected')
const arrow = document.getElementById('arrow')
const apiInfo = "http://167.172.69.56:3000/api/telemetry/parkingData"
const dropdown = document.getElementById("dropdown")
const map_img = document.getElementById("img-map")
const parkStatus = async ()=>{
    //const left = 250
    //const top  = 20
    //const interval = 123
    apiUrl = `http://167.172.69.56:3000/api/telemetry/getSensors${level%2+1}`
    console.log(parks)
    const left = 21.5
    const top  = 20
    const interval = 12.7
    const spotResponse = await fetch(apiUrl,
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }})
    const spotStatus = await spotResponse.json();
    for (let index=0;index<spotStatus.length;index++){
        if(spotStatus[index] == false) {
            parks.children[index+1].innerHTML = "<img src='green.svg' width='45%' height='45%' class='status'/>"
        }
        else{
            parks.children[index+1].innerHTML = "<img src='red.png' width='45%' height='45%' class='status'/>"
        }
        //parks.children[index+1].style.left= `${left+interval*index}px`
        parks.children[index+1].style.left= `${left+interval*index}vw`
        if (level%2 === 0 ){
            parks.children[0].src = 'map1.png'
            for (let index=0;index<4;index++){
                parks.children[index+1].style.top= `${top}px`
                parks.children[index+1].style.bottom= null
            }
        }
        else{
            parks.children[0].src = 'map2.png'
            for (let index=0;index<4;index++){
                parks.children[index+1].style.top= null
                parks.children[index+1].style.bottom= `${top}px`
            }
        }
    }
    //console.log(parks)
}

const parkInfo = async ()=>{
    const spotResponse = await fetch(apiInfo,
        {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }})
    const spotInfo = await spotResponse.json();
    //console.log(spotInfo)
    empty[0].innerHTML = spotInfo['available']
    searching[0].innerHTML = spotInfo['searching']
    occupied[0].innerHTML = spotInfo['occupied']
    empty[1].innerHTML = spotInfo['available']
    searching[1].innerHTML = spotInfo['searching']
}
const loadPicture = () =>{
    // parkInfo()
    // parkStatus()
    setInterval(parkInfo,1500)
    setInterval(parkStatus,1500)
}
loadPicture()
function add(){
    level++
    parkStatus()
}
let clicked=false;
dd_btn.addEventListener("click", ()=>{
    if(clicked===true){
        arrow.style.transform = "rotate(180deg)";
        dropdown.style.display="none";
        dd_btn.style.borderRadius="40px";
    }
    else{
        arrow.style.transform = "rotate(0deg)";
        dropdown.style.display="block";
        dd_btn.style.borderRadius="40px 40px 0px 0px";
    }
    clicked =!clicked;
    console.log(clicked)
})

dropdown.addEventListener("click",()=>{
    dropdown.style.display= "none";
    arrow.style.transform = "rotate(180deg)";
    temp = dropdown.innerHTML
    dropdown.innerHTML = selected_level.innerHTML
    selected_level.innerHTML = temp
    level++
    parkStatus()
}
)
//setInterval(parkInfo,1000)
//setInterval(parkStatus,1000)

/*
const ou = [true,false,true]

for (let x in ou){
    if(x == true) {
        parks.children[index].innerHTML = "<img src='green.png' width='100%' height='100%'>"
    }
    else{
        parks.children[index].innerHTML = "<img src='red.png' width='100%' height='100%'>"
    }
    index++
}*/


//console.log(Object.keys(hello))
