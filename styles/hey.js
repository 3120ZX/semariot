let level = 0
let apiUrl = `http://167.172.69.56:3000/api/telemetry/getSensors${level%2+1}`
const parks = document.getElementById('map')
const empty = document.getElementsByClassName('empty')
const searching = document.getElementsByClassName('searching')
const occupied = document.getElementsByClassName('occupied')
const nav_btn = document.getElementsByClassName('nav_ud')
const floor_name =document.getElementsByClassName('loc_box')
const apiInfo = "http://167.172.69.56:3000/api/telemetry/parkingData"

const parkStatus = async ()=>{
    //const left = 250
    //const top  = 20
    //const interval = 123
    apiUrl = `http://167.172.69.56:3000/api/telemetry/getSensors${level%2+1}`
    const left = 13
    const top  = 20
    const interval = 6.5
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
            parks.children[index+1].innerHTML = "<img src='green.svg' width='100%' height='100%' class='status'/>"
        }
        else{
            parks.children[index+1].innerHTML = "<img src='red.png' width='100%' height='100%' class='status'/>"
        }
        //parks.children[index+1].style.left= `${left+interval*index}px`
        parks.children[index+1].style.left= `${left+interval*index}vw`
        if (level%2 === 0 ){
            floor_name[0].innerHTML ="Binus ASO Alam Sutera 1st Floor"
            parks.children[0].src = 'map1.png'
            for (let index=0;index<6;index++){
                parks.children[index+1].style.top= `${top}px`
                parks.children[index+1].style.bottom= null
            }
            nav_btn[0].style.cursor='pointer'
            nav_btn[1].style.cursor='auto'
            nav_btn[0].addEventListener('click', add)
            nav_btn[1].removeEventListener('click', add)
        }
        else{
            floor_name[0].innerHTML ="Binus ASO Alam Sutera 2nd Floor"
            parks.children[0].src = 'map2.png'
            for (let index=4;index<6;index++){
                parks.children[index+1].style.top= null
                parks.children[index+1].style.bottom= `${top}px`
            }
            nav_btn[0].style.cursor='auto'
            nav_btn[1].style.cursor='pointer'
            nav_btn[0].removeEventListener('click', add)
            nav_btn[1].addEventListener('click', add)
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
    setInterval(parkInfo,5000)
    setInterval(parkStatus,5000)
}
loadPicture()
function add(){
    level++
    parkStatus()
}
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
