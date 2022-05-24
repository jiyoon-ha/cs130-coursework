const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    // clear out the tracks container
    document.querySelector('#tracks').innerHTML = "";
    fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=track&q=` + term)
        .then(response => response.json())
        .then(tracks => {
            console.log(tracks);
            if (tracks.length === 0) {
                document.querySelector('#tracks').innerHTML = `
                <p>No tracks found that match your search criteria.</p>
                `;
            }
            counter = 0;
            for (const track of tracks) {
                //document.querySelector('#tracks').innerHTML += `
                //    <p>${track.name}</p>
               // `;
                document.querySelector('#tracks').innerHTML += `
                    <button class="track-item preview" onclick="handleTrackClick(event)" data-preview-track="${track.preview_url}">
                            <img src="${track.album.image_url}">
                            <i class="fas play-track fa-play" aria-hidden="true"></i>
                            <div class="label">
                                <h2>${track.name}</h2>
                                <p>
                                    ${track.artist.name}
                                </p>
                            </div>
                        </button>
                    `;

                counter += 1;
                if (counter >= 5) {
                    break;
                }
            }
        });
};

const getAlbums = (term) => {
    document.querySelector('#albums').innerHTML = "";
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
        fetch(`https://www.apitutor.org/spotify/simple/v1/search?type=album&q=` + term)
            .then(response => response.json())
            .then(albums => {
                console.log(albums);
                if (albums.length === 0) {
                    document.querySelector('#albums').innerHTML = `
                    <p>No albums were returned.</p>
                    `;
                }
                for (const album of albums) {
                    ///document.querySelector('#albums').innerHTML += `
                        //<p>${album.name}</p>
                    //`;
                    document.querySelector('#albums').innerHTML += `
                    <section class="album-card" id="${album.id}">
                    <div>
                    <img src="${album.image_url}">
                    <h2>${album.name}</h2>
                    <div class="footer">
                    <a href="https://open.spotify.com/album/${album.id}" target="_blank">
                    view on spotify
                    </a>
                        </div>
                        </div>
                    </section>
                `}
            });
};
const getArtist = (term) => {
    let url = `https://www.apitutor.org/spotify/simple/v1/search?type=artist&q=${term}`;
    const element = document.querySelector('#artist');
    element.innerHTML = ""
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const firstArtist = data[0];
            console.log(data);
                element.innerHTML += `
                <section class="artist-card" id="${firstArtist.id}">
    <div>
        <img src="${firstArtist.image_url}">
        <h2>${firstArtist.name}</h2>
        <div class="footer">
            <a href="${firstArtist.spotify_url}" target="_blank">
                view on spotify
            </a>
        </div>
    </div>`
            
        });
};
 
const handleTrackClick = (ev) => {
    const previewUrl = ev.currentTarget.getAttribute('data-preview-track');
    console.log(previewUrl);
    audioPlayer.setAudioFile(previewUrl);
    audioPlayer.play();
    document.querySelector("#current-track").innerHTML=ev.currentTarget.innerHTML;
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};