(function ($) {
    "use strict";

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

        // Elements we’ll update
        var $title    = $('.l1-txt1');   // "Coming Soon"
        var $subtitle = $('.m2-txt1');   // "Follow us for update now!"
        var $form     = $('#subscribeForm');

        // When the form actually submits (validator allowed it)
        $form.on('submit', function(){
            // optional: block bots via honeypot
            if ($form.find('input[name="company"]').val()) return true; // let it post to nowhere

            // Instantly swap UI (optimistic), while the POST happens in the hidden iframe
            $form.fadeOut(200, function(){
                $title.text("Thank you — you're on the list! 🎉");
                $subtitle.text("We’ll email you when we launch.");
            });

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

    })(jQuery);})