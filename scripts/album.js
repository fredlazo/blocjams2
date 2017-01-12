 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };


var createSongRow = function(songNumber, songName, songLength){
    var template = 
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

    return template;
};

/*
        <tr class="album-view-song-item">
            <td class="song-item-number" data-song-number="songNumber">songNumber</td>
            <td class="song-item-title">songName</td>
            <td class="song-item-duration">songLength</td>
        </tr>
*/

var setCurrentAlbum = function(album){
    var albumImage = document.getElementsByClassName('album-cover-art')[0];    
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    
    albumImage.setAttribute('src', album.albumArtUrl);
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
        
    albumSongList.innerHTML = '';
    
    for (var i = 0; i<album.songs.length; i++){
        albumSongList.innerHTML += createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
    }
};



function findParentByClassName(element, targetClass) {
    /* I think this works without if (element) */
    if (element) { 
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        } 
    /* Not sure if !==null is necessary*/
        return currentParent;
    }
}

function getSongItem(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
}


 var clickHandler = function(targetElement) {
     var songItem = getSongItem(targetElement);
     
     if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }

 };``


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

window.onload = function(){
    setCurrentAlbum(albumPicasso);
    
    songListContainer.addEventListener('mouseover', function(event){
        /*If you roll over one of the three <td>s... */
        if (event.target.parentElement.className === 'album-view-song-item'){ 

            /*
            This is the case when it's all numbers;  no currentlyPlayingSong yet
            Mouseover the number, name or duration gives a WHITE play button
            NOTE: This does not include mouseover the White play button, creating a PURPLE play button.
            */
            var songItem = getSongItem(event.target);
            /*
            Mouseover title or duration in a row that is playing will NOT change pause into play.
            Mouseover title of duration in a row that is NOT playing WILL change number into play.
            */
            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }            
        }
    });
    
    for (var i = 0;i < songRows.length; i++){
        /*Listening for mouseovers in this element(row), which can be any of the 4 targets*/
        songRows[i].addEventListener('mouseleave', function(event){
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
        });
    
        /*Listening for clicks in this element(row), which can be any of the 4 targets*/
        songRows[i].addEventListener('click', function(event){
            clickHandler(event.target);
        });
    }
};


















