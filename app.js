talkify.config.host = 'http://talkify.net';
var ttsPlayer;
var ttsPlaylist;

talkify.config.ui.audioControls = {
  enabled: true, //<-- Disable to get the browser built in audio controls
};

$(document).ready(function() {
    
    ttsPlayer = new talkify.TtsPlayer()
    .setRate(1)
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

        console.log(ttsPlayer.events)

        ttsPlayer.events['onPause'] = function (e) {
            console.log('This is a pause!');
            console.log(ttsPlayer);
            console.log(ttsPlaylist);
            ttsPlayer.dispose();
            ttsPlaylist.disableTextInteraction();
            ttsPlayer.pause();
          //  disableAllTts();
        };
    }

    function disableAllTts () {
        ttsPlaylist.disableTextInteraction();
        ttsPlayer.pause();
    }



 
/*
    ttsPlayer.on('pause', function (e) {
        console.log('Its a pause without on');
    });
    /*
    ttsPlaylist.on('onPause', function (e) {
        console.log('list Its a pause');
    });

    ttsPlaylist.on('pause', function (e) {
        console.log('list Its a pause without on');
    });
  */  
    $( '#enable_toggle' ).click(function() {
        $( ".talkify-audio-control" ).toggle( "slow" );
        if ($(this).is(":checked")) {
            enableAllTts();
        } else {
            disableAllTts();
        }

    });  
});
