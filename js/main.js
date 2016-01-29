$( document ).ready(function() {
    // let's fire the lazyload
    $("img").unveil(50, function() {
        $(this).load(function() {
            this.style.opacity = 1;
        });
    });
});
