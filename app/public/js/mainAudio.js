$(function(){

    var parser = new UAParser(); 
    var reproduzAudio = true;
    var mapActive = false;
    var mapSlide = false;
    var texto = "";
    var context_Returned = "";
     var audio_context = new AudioContext
     console.log(audio_context);

   function scrollToDown() {
     //calculo para pegar a medida do celular até o topo
        var topo = $('form').position().top;
        var t = 118;
        var result = topo - t;

         $('.scroll').css('height', result);
         $('.scroll').scrollTop($('.scroll')[0].scrollHeight);
      }

    var recording = false;
    var i = 0;

    var startRecorder = function(recorder) {
        recorder.clear();
        recorder.record();
        console.log('1');
        recording = true;

    }

    var stopRecorder = function(recorder) {
        recorder.stop();
        recorder.exportWAV(function(wav) {
        var url = window.webkitURL.createObjectURL(wav);
        $(".scroll").append("<div class='chat-message row'> <div class='usuario col-xs-12 col-sm-10 col-md-8'><span> <audio id="+i+" controls='controls'> </audio> </span></div><div class='usuario-logo col-xs-6 col-md-4 col-sm-2'> <img class='img-logo' src='img/userChat.png'></div></div>");
        scrollToDown();
       enviaMensagemWatson(wav);
        $("audio#"+ i +"").attr("src", url);
        $("audio#"+ i +"").get()[0].load();
    recording = false;
        });
    i++;
    }

    var playbackRecorderAudio = function (recorder, context) {
        recorder.getBuffer(function (buffers) {
        var source = context.createBufferSource();
        source.buffer = context.createBuffer(1, buffers[0].length, 44100);
        source.buffer.getChannelData(0).set(buffers[0]);
        source.buffer.getChannelData(0).set(buffers[1]);
        source.connect(context.destination);
        source.noteOn(0);
        });
    }


    navigator.webkitGetUserMedia({"audio": true}, function(stream) {
    
        var audioContext = new webkitAudioContext();
        var mediaStreamSource = audioContext.createMediaStreamSource( stream );
        mediaStreamSource.connect( audioContext.destination );

        var recorder = new Recorder(mediaStreamSource, {
        workerPath: "js/rew.js"
        });

    $('#record-toggle').bind( "touchstart", function (event) {

                    startRecorder(recorder);
                    recording = true;
                    $("#txtarea").attr("placeholder", "Gravando...");//.css('width', '200px');
                
        });

        $('#record-toggle').bind( "touchend", function (event) {
            
                stopRecorder(recorder);
                    recording = false;
                    $("#txtarea").attr("placeholder", "Digite algo aqui...");//.css('width', '500px');;

        });
    
        $("#webaudio-playback").click(function (e) {
        e.preventDefault();
        playbackRecorderAudio(recorder, audioContext);
        })

    }, 

    function(error) {
        alert("Error: you need to allow this sample to use the microphone.");
    });
function  enviaAudioWatson(blob) {
    var reader = new window.FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = function() {
        base64data = reader.result;                
       // console.log(base64data );
        enviaAudioWatson2(base64data.substring("data:audio/wav;base64,".length));
    }
}
function  enviaAudioWatson2(encodedString) {

//var encodedString = btoa(blob);
console.log(encodedString);

    if ($('.scroll').data('context') != null) {
        context_Returned = JSON.stringify($('.scroll').data('context'));
    }

    var message = {
     // sessionCode: context_Returned,
        returnAudio: reproduzAudio,
         "audio":{
                  "type":"audio/wav",
                  "length":encodedString.length,
                  "content":encodedString,
                }

    };
console.log(message);

    /* Define AJAX Settings */
    jQuery.support.cors = true;
    var ajaxURL = "https://assistentevirtual.mybluemix.net/api/conversations" //"http://localhost:51480/api/mapfre/conversation"; "http://netcorecontroler.mybluemix.net/api/mapfre/conversation"
    var ajaxType = "POST";
    var ajaxResponseParseMethod = "json";
    var ajaxCrossDomain = true;
    var ajaxDataToTarget = message; 
     var headersAjax = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'CHANNEL': 'WEB',
        'SUBCHANNEL': 'CHAT',
        'API-KEY': '56448193-695a-40b4-9ffc-28891a758034',
        'OS': parser.getOS().name,
        'OS-VERSION': parser.getOS().version,
        'BROWSER': parser.getBrowser().name,
        'BROWSER-VERSION': parser.getBrowser().version,
        'IP': userip,
        'LOCALE': navigator.language
        };

    jQuery.ajax({
        
         headers:headersAjax,                     
         type: ajaxType	,							 
         url: ajaxURL,									
         crossDomain: ajaxCrossDomain,		    
         data: JSON.stringify(ajaxDataToTarget),	
         dataType: ajaxResponseParseMethod,		
        success:function(data) {
           
          console.log(data);
            Message(data.intent.text);
           // if (data.output.mapa.activeMap == true){
            //    Mapa(data.output.mapa.origem, data.output.mapa.destino);
            //     $('#texto').html("<div class='chat-message row'><div class='message-logo col-xs-1 col-md-4 col-sm-2'><img class='img-logo' src='img/logoChat.png'></div><div class='message col-xs-12 col-sm-10 col-md-8'><span> " + data.output.mapa.origem + " " + data.output.mapa.destino + " //</span></div></div>");
          //  }

            //Gravar ID da conversa
            context_Returned = JSON.stringify(data.context);
    }						        /* true - will cache URL data returned; false - will not cache URL data but only for HEAD AND GET requests */
   
 })
  
}
  function Message(texto){
         b =  $(".scroll").append("<div class='chat-message row'><div class='message-logo col-xs-1 col-md-4 col-sm-2'><img class='img-logo' src='img/logoChat.png'></div><div class='message col-xs-12 col-sm-10 col-md-8'><span> " + texto + " </span></div></div>");
         scrollToDown();

    }

});