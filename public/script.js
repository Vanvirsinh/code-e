let form = $('.main-container form');
let input = $('.main-container form input');
let button = $('.main-container form button');

input.keyup(function () {
    if (this.value) {
        form.addClass('valid');
    } else {
        form.removeClass('valid');
    }
});

// On focus and blur
function focused() {
    input.addClass('focused');
    if (input.val()) {
        form.addClass('valid');
    } else {
        form.removeClass('valid');
    }
}

function blurred() {
    input.removeClass('focused')
}

// Button loader and Form prevention if the input is empty

form.on("submit", function (event) {
    if (!input.val()) {
        event.preventDefault();
    } else {
        button.text('');
        button.addClass("loading");

        setTimeout(() => {
            button.text('Generate');
            button.removeClass("loading");
        }, 10000);
    }
});

// Image loader

let loader = $('.ind-image .loader');
let image = $('.ind-image img');

image.on('load', function () {
    $(this).next().css('display', 'none');
});