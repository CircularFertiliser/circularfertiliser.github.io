
(function ($) {
    "use strict";

        var $form     = $('#subscribeForm');
        var $inputs   = $form.find('.validate-input .input100');
        var $title    = $('.l1-txt1');   // "Coming Soon"
        var $subtitle = $('.m2-txt1');   // "Follow us for update now!"
        var $btn      = $form.find('button[type="submit"]');
        var iframeEl  = document.getElementById('hidden_iframe');

        // 1) Validate on submit, post to iframe, show "sending..."
        $form.on('submit', function (e) {
            var ok = true;

            for (var i = 0; i < $inputs.length; i++) {
            if (!validate($inputs[i])) { showValidate($inputs[i]); ok = false; }
            }
            if (!ok) { e.preventDefault(); return false; }

            // honeypot
            if ($form.find('input[name="company"]').val()) {
            e.preventDefault(); // bot; block
            return false;
            }

            // UX: disable button while sending
            $btn.prop('disabled', true);

            // allow submit → goes to hidden iframe
            return true;
        });

        // 2) Wait for postMessage from the iframe (sent by Apps Script), then flip UI
        window.addEventListener('message', function (ev) {
            if (ev.source !== iframeEl.contentWindow) return;        // only our iframe
            if (!ev.data || ev.data.type !== 'cfi:signup_ok') return; // only our signal

            $form.fadeOut(200, function () {
            $title.text("Thank you — you're on the list! 🎉");
            $subtitle.attr('aria-live','polite').text("We’ll email you when we launch.");
            });
        });

        // show/hide validation
        $form.on('focus', '.input100', function(){ hideValidate(this); });

        function validate (input) {
            var $i = $(input);
            if ($i.attr('type') === 'email' || $i.attr('name') === 'email') {
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($i.val().trim());
            } else {
            return $i.val().trim() !== '';
            }
        }
        function showValidate(input){ $(input).parent().addClass('alert-validate'); }
        function hideValidate(input){ $(input).parent().removeClass('alert-validate');
        }
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    
    
    /*==================================================================
    [ Simple slide100 ]*/

    $('.simpleslide100').each(function(){
        var delay = 7000;
        var speed = 1000;
        var itemSlide = $(this).find('.simpleslide100-item');
        var nowSlide = 0;

        $(itemSlide).hide();
        $(itemSlide[nowSlide]).show();
        nowSlide++;
        if(nowSlide >= itemSlide.length) {nowSlide = 0;}

        setInterval(function(){
            $(itemSlide).fadeOut(speed);
            $(itemSlide[nowSlide]).fadeIn(speed);
            nowSlide++;
            if(nowSlide >= itemSlide.length) {nowSlide = 0;}
        },delay);
    });


})(jQuery);