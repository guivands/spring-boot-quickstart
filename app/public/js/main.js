(function() {

    var widgettop = "";
    var chattop = "";
    var numwidget = "";
    var pesquisa = "";
    var codSend = "";
    var parser = new UAParser();
    var reproduzAudio = false;
    var mapActive = true;
    var origemRota = "";
    var mudo = 1;
    var destinoRota = "";
    var jsonSatisfacao = "";
    var comentario = "";
    var evaluation;
    var answerSatis;
    var mapSlide = false;
    var texto = "";
    var context_Returned = "";
    var recording = false; // "https://assistentevirtual.mybluemix.net/api/conversations/"+ context_Returned 
    var i = 0;
    var widget = false;
    // http://pruebaeveris.mybluemix.net/api/conversations
    //Ajax
    var ajaxURL = "https://eva-broker.mybluemix.net/api/conversations/" + context_Returned; //"http://localhost:51480/api/mapfre/conversation"; "http://netcorecontroler.mybluemix.net/api/mapfre/conversation"
    var ajaxType = "POST";
    var ajaxResponseParseMethod = "json";
    var ajaxCrossDomain = true;
    var headersAjax = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'PROJECT': 'B2B',
        'CHANNEL': 'Assine Empresas',
        'API-KEY': '56448193-695a-40b4-9ffc-28891a758034',
        'OS': parser.getOS().name,
        'OS-VERSION': parser.getOS().version,
        'BROWSER': parser.getBrowser().name,
        'BROWSER-VERSION': parser.getBrowser().version,
        'LOCALE': 'pt-br',
        'USER-REF': "127.0.0.1",
        'BUSINESS-KEY': ""
    };


     $('#poupchat').css('display','none');
     $('#web').css('display','none');
    window.esconderWidgetVivi = function() {

        $('#web').css('display', 'none');
        widget = false;

    };

    window.mostrarWidgetVivi = function(numwidget) {
        widgettop = numwidget;
        widget = true;
        $('#web').css('top', "" + numwidget + "px").css('display', 'block');


    };

    window.esconderChatVivi = function(top, right) {

        chattop = top;
        $('#poupchat').css('top', "" + top + "px").css('right', "" + right + "px").css('display', 'none').css('position', 'absolute');

    };

    window.mostrarChatVivi = function(numchat, numchatright) {

        chattop = numchat

        $('#poupchat').css('top', "" + 50 + "px").css('right', "" + numchatright + "px").css('display', 'block').css('position', 'absolute');

    };


$('.btn-double-text').click(function(){
    //alert('aaaaaaaaaaaaaaa');
})
    $(".scroll-everis").scroll();

    //jQuery('#poupchat').css('top','38px');


    $('.input-everis').mask('(99) 9999-99999');



    $('#poupchat').draggable({
        containment: "body"
    }); //, cancel: "div"});


    function sizeOfThings() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var top

        //document.querySelector('.window-size').innerHTML = windowWidth + 'x' + windowHeight;
        // $('#poupchat').css('top','8px').css('right','30px');

    };
    sizeOfThings();

    window.addEventListener('resize', function() {
        sizeOfThings();
    });



    $(window).scroll(function() {
        set = $(document).scrollTop() + widgettop;

        //jQuery('.assistent').animate({
          //  top: set + "px"
      //  }, {
            //duration: 0,
            //queue: false
        //});

       // bas = $(document).scrollTop() + chattop;

      //  jQuery('#poupchat').animate({
         //   top: bas + "px"
      //  }, {
        //    duration: 0,
          //  queue: false
      //  });

        //s = $(document).scrollTop() + 80;

        //jQuery('.satisfacao').animate({
            //'top': s + "px"
        //}, {
          //  duration: 0,
           // queue: false
        //});
    });

    $('#texto').click(function() {

        $('#texto').focus();

    });

    $('.button-everis').click(function() {
        $('#tel').css('display', 'none');
        $('#texto').focus();
        $('#chat').css('display', 'inline-block');



        var headersAjax = {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'PROJECT': 'B2B',
            'CHANNEL': 'Assine Empresas',
            'API-KEY': '56448193-695a-40b4-9ffc-28891a758034',
            'OS': parser.getOS().name,
            'OS-VERSION': parser.getOS().version,
            'BROWSER': parser.getBrowser().name,
            'BROWSER-VERSION': parser.getBrowser().version,
            'LOCALE': 'pt-br',
            'USER-REF': "127.0.0.1",
            'BUSINESS-KEY': ""
        };

    });

    // $('').keypress(function (event) {
    //     if (event.which == 13) {
    //       $("#enviar").click();


    //  }

    //});




    function scrollToDown() {

        $('.scroll-everis').scrollTop($('.scroll-everis')[0].scrollHeight);
    }

    $("#enviar").click(function() {

        var text = $('#texto').val();

        if ($('#texto').val() != "") {
            $(".scroll-everis").append("<div><p class='texto-vivi'><a class='icon-user'></a> <span class='texto-user'>Você</span></p> <span class='resposta-user'>" + text + "</span> </div>");
            // atualizar scroll para baixo
            scrollToDown();
            //Enviar para Watson
            $("#texto").css('background', 'rgba(128,128,128,0.1)');
            $("#texto").attr('placeholder', 'Por favor Aguarde ...');
            $("#texto").attr('disabled', 'disabled');
            $("#enviar").attr('disabled', 'disabled');

            sendMensagemWatson(text);
        } else {
            //   $("#texto").css('border', 'rgba(255, 0, 0, 0.73) solid 2px')
            //   .css('box-shadow','0 0px 12px 4px rgba(255, 0, 0, 0.73)');
        }
        //limpar        
        $('#texto').val('');

    });

    $('#texto').keypress(function(event) {
        if (event.which == 13) {
            $("#enviar").click();


        }
    });

    $(document).keypress(function(event) {
        if (event.which == 13) {
            $(".button-everis").click();


        }
    });



    function sendMensagemWatson(usermessage) {

        /* Define estrutura da mensagem para ser enviada via JSON ao servidor */

        var response_Returned = "";
        var dialogStack_Returned = "";
        var dialog_turn_counter_Returned = 0;
        var dialog_request_counter_Returned = 0;

        //  if ($('.scroll-everis').data('context') != null) {
        ////     context_Returned = JSON.stringify($('.scroll-everis').data('context'));
        //}

        ajaxURL = "https://eva-broker.mybluemix.net/api/conversations/" + context_Returned;

        var message = {
            text: usermessage,
            returnAudio: false
        };
        if (codSend)
            message.code = codSend;


        /* Define AJAX Settings */
        jQuery.support.cors = true;
        var ajaxDataToTarget = message;

        /* Define AJAX Settings */
        jQuery.support.cors = true;
        var ajaxDataToTarget = message;

        jQuery.ajax({

            headers: headersAjax,
            type: ajaxType,
            url: ajaxURL,
            crossDomain: ajaxCrossDomain,
            data: JSON.stringify(ajaxDataToTarget),
            dataType: ajaxResponseParseMethod,
            success: function(data) {
                //console.log(data.sessionCode);
                try {
                    if (data.sessionCode)
                        context_Returned = data.sessionCode;
                } catch (err) {


                }
                console.log(data);
                answerAssistant(data);

                // if (data.output.mapa.activeMap == true){
                //   Mapa(data.output.mapa.origem, data.output.mapa.destino);
                //    $('#texto').html("<div class='chat-message row'><div class='message-logo col-xs-1 col-md-4 col-sm-2'><img class='img-logo' src='img/logoChat.png'></div><div class='message col-xs-12 col-sm-10 col-md-8'><span> " + data.output.mapa.origem + " " + data.output.mapa.destino + " </span></div></div>");
                //  }

                //Gravar ID da conversa
                // context_Returned = data.sessionCode;
            },
            /* true - will cache URL data returned; false - will not cache URL data but only for HEAD AND GET requests */
            error: function(data) {
                answerAssistantError();
                console.log(data);
            }
        })

        console.log(ajaxURL);
    }

    function answerAssistantError() {

        $(".scroll-everis").append("<div><p class='texto-vivi'><a class='informacao'></a> <span class='texto-watson'>Vivi</span></p><span class='resposta-vivi'>Falha na comunicação... Tente novamente</span>  </div>");

        scrollToDown();


        $("#texto").removeAttr('disabled');
        $("#enviar").removeAttr('disabled');
    }

    function answerAssistant(texto) {

        try {
            var html = "<lu style='list-style-type: none;'>";
            if (texto.answers[0].options.length != undefined) {
                for (var i = 0; i < texto.answers[0].options.length; i++) {

                    html += "<li class='margin-top5px'><div class='poup-intent"+i+"' id='everispoup' style='display: none;'> <span class='icon-x'><p class='xvivo'></p></span> <div class='scroll-poup"+i+"' draggable='false'> </div> <div id='seta' class='seta-poup'></div> </div><a href='javascript:void(0)' id='lis-poup' class='"+i+"' data-text='" + texto.answers[0].options[i].text + "' data-title='" + texto.answers[0].options[i].text + "'>" + texto.answers[0].options[i].title + "</a></li>";


                }

                $(".scroll-everis").append("<div><p class='texto-vivi'><a class='informacao'></a> <span class='texto-watson'>Vivi</span></p><span class='resposta-vivi'>Veja a(s) resposta(s) que eu encontrei, escolha aquela que é melhor para o que você precisa ? " + html + "</lu></span></div>");
            }
            scrollToDown();
        } catch (err) {
            $(".scroll-everis").append("<div><p class='texto-vivi'><a class='informacao'></a> <span class='texto-watson'>Vivi</span></p><span class='resposta-vivi'>" + texto.answers[0].text + "</span>  </div>");

            scrollToDown();
        }

        $("#texto").attr('placeholder', 'Escreva uma mensagem')
            .css('background', 'white')
            .removeAttr('disabled')
            .focus();

        $("#enviar").removeAttr('disabled');


    }



    $(".scroll-everis").delegate("#lis-poup", "click", function() {
        // alert('passou');
        var agr = $(this).context.className;
        var title = $(this).data('title');

        $(".poup-intent"+agr+"").css('display','none');
        
        $(".poup-intent0").css('display','none');
        
        $(".poup-intent1").css('display','none');

        $(".poup-intent"+agr+"").css('display','block');
        $(".scroll-poup"+agr+"").html($(this).data('text'));

        $(".icon-x").click(function() {
               $(".poup-intent"+agr+"").css('display', 'none');
               $('#everispoup').css('display','none');      


        });

        $('#poupchat').draggable({
            cancel: "div#everispoup"
        });
    });

    $(".icon-x").click(function() {
               $('#everispoup').css('display','none');
               console.log('ihasdijsadsdajsdaj');
        });
    
    $('.top-seta-1').click(function() {
        $('.obrigado').css('display', 'none');

        $('.assistent').css('display', 'none').css('opacity', '1');
        $('#poupchat').css('display', 'none');

        $('.satisfacao').css('display', 'block').animate({top: '80px',left: "20%"});

     $('#leke').css('background', 'transparent').css('width','100%').css('height','600px').css('position', 'absolute').css('top','0px').css('z-index','999').css('display','block');



    });

     $('#leke').click(function() {

             $('.satisfacao').css('display', 'none');
             $(this).css('display','none');
              $('.assistent').css('opacity','1');
             

     });

    $('.top-seta').click(function() {
        $('#poupchat').css('display', 'none');
        $('.assistent').animate({
            opacity: '1'
        }, 280).css('display', 'block');


    });



    $('.assistent').click(function() {
        $(this).animate({
            opacity: '0'
        }, 280).css('opacity', '0'); 
        $('#leke').css('background', 'transparent').css('width','100%').css('height','600px').css('position', 'absolute').css('top','0px').css('z-index','999').css('display','block');

        $('#poupchat').css('display', 'block');
        



    });

    // fechar satisfação
    $('.icon-satis').click(function() {
        $('.satisfacao').css('display', 'none').css('top', '0px');
        $('#satisfacao').css('display', 'block');
        $('#feedback-satisfacao').css('display', 'none');
        $('.assistent').css('display', 'none').css('opacity', '1');
        if (widget == false) {
            $('.assistent').css('display', 'none').css('opacity', '1');
        } else {
            $('.assistent').animate({
                opacity: '1'
            }, 280).css('display', 'block');
        }


    });

    // passo seguinte da satisfação
    //  $('#button-satisfacao').click(function(){

    //$('#feedback-satisfacao').css('display','block');
    //   $('#satisfacao').css('display','none');


    //  }); 
    $('#button-satisfacao-atras').click(function() {

        $('#feedback-satisfacao').css('display', 'none');
        $('#satisfacao').css('display', 'block');


    });



    $('#satisfacao').delegate(".button-satisfacao", "click", function() {


        if ($("input[name='seguin']:checked").val() == "NAO") {


            $('#feedback-satisfacao').css('display', 'block');
            $('#satisfacao').css('display', 'none');
            // $('.assistent').animate({opacity: '1'}, 280).css('display','block');
            evaluation = $('input[name="satisf"]:checked').val();
            answerSatis = false;


        } else {

            jsonSatisfacao = {
                evaluation: $('input[name="satisf"]:checked').val(),
                answered: true,
                userComments: ""
            };

            PesquisaSatisfacao(jsonSatisfacao);

            // $('.satisfacao').css('display','none');
        }

        if ($("input[name='seguin']:checked").val() == "SIM") {
            $('#satisfacao').css('display', 'none');
            $('.obrigado').css('display', 'block');
        }

    });

    $('#feedback-satisfacao').delegate("#button-satisfacao-enviar", "click", function() {

        jsonSatisfacao = {
            evaluation: evaluation,
            answered: answerSatis,
            userComments: $('.texto-area-satisfacao').val()
        };


        PesquisaSatisfacao(jsonSatisfacao);
        $('.satisfacao').css('display', 'none');
        $('.texto-area-satisfacao').val(" ");

        $('.assistent').animate({
            opacity: '1'
        }, 280).css('display', 'block');

    });

    function PesquisaSatisfacao(pesquisa) {


        jQuery.ajax({

            headers: headersAjax,
            type: ajaxType,
            url: ajaxURL + "/satisfactions",
            crossDomain: ajaxCrossDomain,
            data: JSON.stringify(pesquisa),
            dataType: ajaxResponseParseMethod,
            success: function(data) {

                // answerAssistant(data);
                // if (data.output.mapa.activeMap == true){
                //   Mapa(data.output.mapa.origem, data.output.mapa.destino);
                //    $('#texto').html("<div class='chat-message row'><div class='message-logo col-xs-1 col-md-4 col-sm-2'><img class='img-logo' src='img/logoChat.png'></div><div class='message col-xs-12 col-sm-10 col-md-8'><span> " + data.output.mapa.origem + " " + data.output.mapa.destino + " </span></div></div>");
                //  }

                //Gravar ID da conversa
                context_Returned = data.sessionCode;
            },
            /* true - will cache URL data returned; false - will not cache URL data but only for HEAD AND GET requests */
            error: function(data) {
                //  answerAssistantError();
            }
        })


    }

})();