
window.onload = function () {
    document.querySelector('#SearchResults').hidden = true;
    document.querySelector('#Search').addEventListener('click', clkSearch);
    document.querySelector('#Reset').addEventListener('click', clkReset);
}

const clkSearch = () => {
    let srchArtist = document.querySelector('#Artist').value;
    let srchSong = document.querySelector('#Song').value;
    let srchAlbum = document.querySelector('#Album').value;
    let srchGenre = document.querySelector('#Genre').value;
    let arrSearchResults = musicData.filter(music =>
        (searchValue(music.Artist, srchArtist)
            && searchValue(music.Song, srchSong)
            && searchValue(music.Album, srchAlbum))
        && music.Genre == srchGenre
    );
    if (arrSearchResults.length > 0) {
        document.getElementById("SearchResults").hidden = false;
        populateResults(arrSearchResults);
    }
    else {
        alert('Sorry, No results found')
    }
}

const clkReset = () => {
    document.querySelector('#Artist').value = '';
    document.querySelector('#Song').value = '';
    document.querySelector('#Album').value = '';
    document.querySelector('#Genre').value = '';
    document.querySelector('#SearchResults').hidden = true;
    document.querySelector('#Favourites').innerHTML = ''
}

const clkAddFavourite = (musicId) => {
    let filterFunction = music => music.ID == musicId;
    if (arrFavourites.filter(filterFunction).length > 0) {
        alert('This music is already added as favourite')
    }
    else {
        arrFavourites.push(musicData.filter(filterFunction)[0]);
        populateFavourites();        
    }
}
const clkDownload = () => {
    alert('Download Started');
}

const clkRemoveFavourite = (musicid) => {
    arrFavourites = arrFavourites.filter(music => music.ID != musicid);
    populateFavourites();
}





const searchValue = (value, searchterm) => {
    if (searchterm.trim().length > 0)
        return value.toLowerCase().indexOf(searchterm.toLowerCase()) >= 0;
    else
        return true;
}

const populateResults = (arrResults) => {   
    let arrResultsHtml = arrResults.map(music => {
        return `<tr>
                    <td class='artist'>${music.Artist}</td>
                    <td class='song'>${music.Song}</td>
                    <td class='length'>${music.Time}</td>
                    <td class='album'>${music.Album}</td>
                    <td>${music.Genre}</td>
                    <td class='download'>
                        <button class='btnDownload' onclick='clkAddFavourite(${music.ID});'>Favourite</button>
                    </td>
                    <td class='download'>
                        <button class='btnDownload' onclick='clkDownload();'>Download</button>
                    </td>
                </tr>`;
    });
    document.querySelector('#SearchResults tbody').innerHTML = arrResultsHtml.join('');
}

const populateFavourites = () => {
    let arrResultsHtml = arrFavourites.map(music => {
        return `<img    src="img/cover/${music.Image}" 
                        class="img-fluid"
                        onclick="clkRemoveFavourite(${music.ID});"
                        title="${music.Song}"/>`;
    });
    document.querySelector('#Favourites').innerHTML = arrResultsHtml.join('');
}