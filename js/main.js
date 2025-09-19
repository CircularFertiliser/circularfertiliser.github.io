
(function ($) {
    "use strict";

    // ====== ELEMENTS ======
    var $form     = $('#subscribeForm');
    var $inputs   = $form.find('.validate-input .input100');
    var $title    = $('.l1-txt1');   // "Coming Soon"
    var $subtitle = $('.m2-txt1');   // "Follow us for update now!"
    var $btn      = $form.find('button[type="submit"]');
    var iframeEl  = document.getElementById('hidden_iframe');
    var submitted = false;

    // ====== SUBMIT (validate → post to iframe) ======
    $form.on('submit', function (e) {
        var ok = true;
        for (var i = 0; i < $inputs.length; i++) {
            if (!validate($inputs[i])) { showValidate($inputs[i]); ok = false; }
        }
        if (!ok) { e.preventDefault(); return false; }

        // honeypot
        if ($form.find('input[name="company"]').val()) {
            e.preventDefault();
            return false;
        }

        submitted = true;
        $btn.prop('disabled', true); // UX while sending
        return true; // let it submit to the hidden iframe
        });

    // ====== SUCCESS SIGNAL (primary: postMessage from Apps Script) ======
    window.addEventListener('message', function (ev) {
        // accept only messages from Apps Script
        if (!ev.origin || ev.origin.indexOf('https://script.google.com') !== 0) return;
        if (!ev.data || ev.data.type !== 'cfi:signup_ok') return;
        showSuccess();
    });

    // ====== FALLBACK (iframe load after submit) ======
    iframeEl.addEventListener('load', function () {
    if (submitted) showSuccess();
    });

    function showSuccess() {
    if ($form.data('done')) return; // guard
    $form.data('done', 1);

    // clear input and flip UI
    $form.find('input[name="email"]').val('');
    $form.fadeOut(200, function () {
        $title.text("Thank you — you're on the list! 🎉");
        $subtitle.attr('aria-live','polite').text("We’ll email you when we launch.");
    });
    }

    // ====== VALIDATION HELPERS ======
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