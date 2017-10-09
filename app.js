talkify.config.host = 'http://talkify.net';
var ttsPlayer;
var ttsPlaylist;

talkify.config.ui.audioControls = {
  enabled: true, //<-- Disable to get the browser built in audio controls
  container: document.getElementById("player-and-voices")
};

$(document).ready(function() {

    ttsPlayer = new talkify.TtsPlayer()
    .enableTextHighlighting();

    ttsPlayer.onPlay = function () {
        console.log("Sentence is ended");
    }

    function enableAllTts () {
      ttsPlaylist = new talkify.playlist()
        .begin()
        .usingPlayer(ttsPlayer)
        .withRootSelector('#root')
        .withTextInteraction()
        .build();
    }

    function disableAllTts () {
        ttsPlaylist.disableTextInteraction();
        ttsPlayer.pause();
    }

    $( '#enable_toggle' ).click(function() {
        $( ".talkify-audio-control" ).toggle( "slow" );
        if ($(this).is(":checked")) {
            enableAllTts();
        } else {
            disableAllTts();
        }

    });  
});
