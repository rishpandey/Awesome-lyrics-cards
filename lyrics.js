
function showLyrics(lyrics){
    
}


function getLyrics(){

var artistSearch = document.getElementById("artist").value;
var titleSearch = document.getElementById("title").value;

  $.ajax({
    type: "GET",
    data: {
        apikey:"9258ca509d6e0e47a33fb3e66679123c",
        q_artist: artistSearch,
        q_track: titleSearch,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/track.search",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {

        track_list = data.message.body.track_list;

        track = track_list.reduce(function(initial, currentTrack){   
            return (currentTrack.track.track_rating > initial.track.rating ? currentTrack : initial);
        },{"track" : {"rating":0}});
        track_id = track.track.track_id;
        console.log(track_id);

        $.ajax({
            type: "GET",
            data: {
                apikey:"9258ca509d6e0e47a33fb3e66679123c",
                track_id : track_id,
                format:"jsonp",
                callback:"jsonp_callback"
            },
            url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get",
            dataType: "jsonp",
            jsonpCallback: 'jsonp_callback',
            contentType: 'application/json',
            success: function(data) {
                lyrics = data.message.body.lyrics.lyrics_body;
                showLyrics(lyrics);                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }    
        });
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 };


 function getLyricsNow(){
    var trackId = document.getElementById("lyrics").textContent;
    console.log(trackId)
  $.ajax({
    type: "GET",
    data: {
        apikey:"9258ca509d6e0e47a33fb3e66679123c",
        track_id: trackId,
        format:"jsonp",
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get",
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) {
       console.log(data); console.log(data.message.body.lyrics.lyrics_body); 
      var lyricsBody = data.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ")+ "...";
       
        var j = document.createElement("p")
        j.textContent = lyricsBody
        document.getElementById("lyrics").appendChild(j)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 };