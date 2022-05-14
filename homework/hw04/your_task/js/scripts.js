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
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);
};

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
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
}

document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};