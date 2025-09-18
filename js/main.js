(function ($) {
        "use strict";

        var $form     = $('#subscribeForm');
        var $inputs   = $form.find('.validate-input .input100');
        var $title    = $('.l1-txt1');
        var $subtitle = $('.m2-txt1');

        $form.on('submit', function (e) {
            var ok = true;

            for (var i = 0; i < $inputs.length; i++) {
            if (!validate($inputs[i])) { showValidate($inputs[i]); ok = false; }
            }
            if (!ok) { e.preventDefault(); return false; }

            if ($form.find('input[name="company"]').val()) { e.preventDefault(); return false; }

            $form.fadeOut(200, function () {
            $title.text("Thank you — you're on the list! 🎉");
            $subtitle.text("We’ll email you when we launch.");
            });

            return true; // let the form post to the hidden iframe
        });

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
        function hideValidate(input){ $(input).parent().removeClass('alert-validate'); }

        
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




