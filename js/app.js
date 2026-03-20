'use strict';
'esversion: 6';

document.addEventListener('click', function (e) {
        const a = e.target.closest('a[target="_blank"]');
        if (a) {
            e.preventDefault();
            try {
                const newWindow = window.open(a.href, '_blank');
                if (!newWindow) {
                    // window.open не сработал (заблокировано или в webview не поддерживается)
                    window.location.href = a.href;
                }
            } catch (err) {
                // Любая ошибка window.open — переходим напрямую
                window.location.href = a.href;
            }
        }
    });

const app = function () {
    const js = () => {
        const html = document.documentElement;
        if (html.classList.contains('no-js')) {
            html.classList.remove('no-js');
        }
    };

    const winners = () => {
        document.querySelectorAll('.promo__dates').forEach(promoDateBlock => {
            const toggleBtn = promoDateBlock.querySelector('.block-ready .promo__dates-show span.open-list');
            const hiddenContent = promoDateBlock.querySelector('.promo__dates-hidden');

            if (toggleBtn && hiddenContent) {
                toggleBtn.addEventListener('click', function(e) {
                    e.preventDefault();

                    // Закрываем другие открытые блоки (опционально)
                    document.querySelectorAll('.promo__dates.active').forEach(activeBlock => {
                        if (activeBlock !== promoDateBlock) {
                            activeBlock.classList.remove('active');
                        }
                    });

                    // Переключаем текущий блок
                    promoDateBlock.classList.toggle('active');

                    setTimeout(() => {
                        const elementRect = promoDateBlock.getBoundingClientRect();
                        const viewportHeight = window.innerHeight;

                        promoDateBlock.scrollIntoView({
                            behavior: 'smooth',
                            block: elementRect.height <= viewportHeight ? 'center' : 'start',
                            inline: 'nearest'
                        });
                    }, 400);
                });
            }
        });
    };

    const faq = () => {
        const faqItems = document.querySelectorAll('.promo__faq-item');

        faqItems.forEach(item => {
            const questionLink = item.querySelector('.promo__faq-item-question a');

            if (questionLink) {
                questionLink.addEventListener('click', function(e) {
                    e.preventDefault();

                    // Просто переключаем активный класс без закрытия других
                    item.classList.toggle('active');

                    // Для анимации высоты
                    const answer = item.querySelector('.promo__faq-item-answer');
                    if (answer) {
                        if (item.classList.contains('active')) {
                            answer.style.maxHeight = answer.scrollHeight + 'px';
                        } else {
                            answer.style.maxHeight = '0';
                        }
                    }
                    // Прокрутка
                    if (item.classList.contains('active')) {
                        // Если элемент открывается - прокручиваем к его началу
                        setTimeout(() => {
                            item.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                                inline: 'nearest'
                            });
                        }, 300); // Небольшая задержка для начала анимации
                    } else {
                        // Если элемент закрывается - прокручиваем к центру экрана
                        setTimeout(() => {
                            item.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                                inline: 'nearest'
                            });
                        }, 100);
                    }
                });
            }
        });
    };

    return {
        init: function () {
            js();
            winners();
            faq();
        }
    };
}();

document.addEventListener('DOMContentLoaded', app.init);