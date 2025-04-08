$(document).ready(function() {

    // 1. Ініціалізація Tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // 2. Ініціалізація Popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // 3. Обробник форми фільтрації жанрів
    $('#genreForm').on('submit', function (e) {
        e.preventDefault(); // Запобігаємо стандартній відправці форми

        const selectedGenreValue = $('#genreSelect').val(); // Наприклад: "action" або "all"

        if (selectedGenreValue === 'all') {
            $('.genre-section').slideDown(); // Плавно показати всі секції
        } else {
            $('.genre-section').slideUp(); // Плавно сховати всі секції
            // Знаходимо секцію за атрибутом data-genre і плавно показуємо її
            $('.genre-section[data-genre="' + selectedGenreValue + '"]').slideDown();
        }
    });

    // 4. Скидання фільтру (додаткова кнопка)
    // Додано обробник через onclick в HTML для простоти:
    // onclick="$('.genre-section').show(); $('#genreSelect').val('all');"


    // 5. Динамічне оновлення вмісту модального вікна (приклад)
    $('#movieDetailModal').on('show.bs.modal', function (event) {
        // Кнопка, яка викликала модальне вікно
        var button = $(event.relatedTarget);

        // Отримуємо дані з атрибутів data-* кнопки
        var title = button.data('title');
        var imgSrc = button.data('img');
        // Тут можна додати більше даних: опис, рейтинг, жанр тощо.
        // var description = button.data('description');

        // Оновлюємо вміст модального вікна
        var modal = $(this);
        modal.find('.modal-title').text(title);
        modal.find('#modalMovieImage').attr('src', imgSrc);
        // modal.find('#modalMovieDescription').text(description || 'Детальний опис відсутній.');
        // Потрібно буде додати логіку для жанру, рейтингу тощо
    });


    // 6. Плавна прокрутка до якорів (для посилань меню)
    $('.navbar-nav a[href^="#"], a.btn[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var targetSelector = this.hash;
        var $target = $(targetSelector);

        if ($target.length) { // Перевіряємо, чи існує елемент з таким ID
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 60 // Віднімаємо висоту navbar (враховуємо fixed-top)
            }, 800, 'swing'); // 800ms - швидкість анімації
        }
    });


    // 7. Підсвічування активного пункту меню при прокрутці (Scrollspy - базовий варіант)
    // Для більш точного Scrollspy з Bootstrap, потрібно додати data-bs-spy="scroll"
    // до body та data-bs-target="#navbarNavDropdown" і налаштувати секції.
    // Ваш варіант з ручним перевірянням теж працює:
    $(window).on('scroll', function() {
        var scrollPosition = $(this).scrollTop() + 70; // Додаємо зсув для fixed navbar
        $('.navbar-nav .nav-link').each(function() {
            var currentLink = $(this);
            var refElement = $(currentLink.attr('href'));

            if (refElement.length && // Перевірка, чи існує елемент
                refElement.offset().top <= scrollPosition &&
                refElement.offset().top + refElement.outerHeight() > scrollPosition)
            {
                $('.navbar-nav .nav-link').removeClass('active');
                currentLink.addClass('active');
            } else {
                currentLink.removeClass('active');
            }
        });

        // Окремо обробляємо Home, якщо він вказує на #home (Jumbotron)
        var homeLink = $('.navbar-nav a[href="#home"]');
        if ($('#home').length && $('#home').offset().top <= scrollPosition && $('#home').offset().top + $('#home').outerHeight() > scrollPosition) {
            if(!homeLink.hasClass('active')) { // Додаємо active тільки якщо його ще немає
                $('.navbar-nav .nav-link').removeClass('active'); // Спочатку знімаємо active з усіх
                homeLink.addClass('active');
            }
        } else {
            // Якщо прокрутка нижче home, але вище наступної секції, home може залишатись active
            // Це потребує більш складної логіки або використання Bootstrap Scrollspy
        }


    }).scroll(); // Викликаємо scroll одразу для встановлення активного пункту при завантаженні

}); // Кінець $(document).ready