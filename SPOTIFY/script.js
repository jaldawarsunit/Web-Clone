console.log("Lets write JavaScript");
let currentSong = new Audio();


async function getSongs(){
    let a = await fetch("http://127.0.0.1:5500/song/")
    let response = await a.text();
    console.log(response)
    let div= document.createElement("div")
    div.innerHTML= response;
    let as =div.getElementsByTagName("a")
    // console.log(as)
    let songs=[]
    for(let index=0;index<as.length;index++){
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/song/")[1])
        }
    }
    return songs
}

const playMusic=(track)=>{

     // let audio=new Audio("/song/"+track)
     currentSong.src="/song/"+track
    currentSong.play();
    play.src="img/pause.svg"

}

async function main(){
    // get the list of all the songs
    let songs= await getSongs()
    console.log(songs)

    let songUL=document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {   
        songUL.innerHTML=songUL.innerHTML+`
        <li>
        <img class="invert" src="./img/music.svg" alt="Music">
        <div class="info">
            <div>${song.replaceAll("%20"," ")}</div>
            <div>Sunit</div>
        </div>
        <div class="playnow">
            <span>Play Now</span>
            <img class="invert" src="./img/play.svg" alt="Play Button">
        </div>
        </li>`;
              
        //attach an event lister to each song
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
            e.addEventListener("click",element=>{
                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            })

        })
        //attach an event lister to play,pervious and next button
        play.addEventListener("click", () => {
            if(currentSong.played){
                currentSong.pause();
                play.src="img/play.svg"
            }
            else if(currentSong.paused){
                currentSong.play();
                play.src="img/pause.svg"
            }
        })


    } 
    

 

    audio.addEventListener("loadeddata",()=>{
        let duration =audio.duration;
        console.log(audio.duration,audio.currentSrc,audio.currentTime);
        //the duration vairabl enow holds the duration (in seconds_of the audio clip)
    });
}

main() 
