$(document).ready(function() {
    $(window).on('scroll', function() {
        var scrollPosition = $(this).scrollTop();
        $('.navbar-nav .nav-link').each(function() {
            var sectionOffset = $($(this).attr('href')).offset().top;
            if (scrollPosition >= sectionOffset - 10) {
                $('.nav-link').removeClass('active');
                $(this).addClass('active');
            }
        });
    });
});
$(document).ready(function () {
    $('#genreForm').on('submit', function (e) {
        e.preventDefault();

        const selected = $('#genreSelect').val();

        if (selected === 'all') {
            // Показати всі жанри
            $('.genre-section').show();

            // Прокрутка до верху сторінки
            $('html, body').animate({ scrollTop: 0 }, 800);
        } else {
            const selectedGenre = selected.replace('#', '');

            // Ховаємо всі секції
            $('.genre-section').hide();

            // Показуємо лише обраний жанр
            $(`#${selectedGenre}`).closest('.genre-section').show();

            // Прокрутка до вибраного жанру
            $('html, body').animate({
                scrollTop: $(`#${selectedGenre}`).offset().top
            }, 800);
        }
    });
});
