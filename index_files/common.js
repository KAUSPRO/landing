var app = app || {};


$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.up-button').fadeIn();
        } else {
            $('.up-button').fadeOut();
        }
    });

    //Click event to scroll to top
    $('.up-button').click(function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    // Equalize
    if ($(".equalize").length) {
        $('.equalize').matchHeight();
    }

    // Sliders
    if ($(".about-container").length) {
        var aboutSwiper = new Swiper('.about-container', {
            speed: 700,
		   autoplay: { delay: 5000, 
		   disableOnInteraction: false},
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            }
        });
    }

    // Clients
    if ($(".js-clients-carousel").length) {

        var clients_slider_config = {
            speed: 400,
            spaceBetween: 0,
            slidesPerView: 7,
            slidesPerGroup: 1,
            slidesPerColumn: 2,
            loop: false,
            slidesPerColumnFill: 'row',
            simulateTouch: false,
            navigation: {
                //nextEl: _this.parent().find('.swiper-button-next'),
                //prevEl: _this.parent().find('.swiper-button-prev'),
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',

                hiddenClass: 'swiper-button-hidden'
            },
            breakpoints: {
                // when window width is <= 320px
                480: {
                  slidesPerView: 2
                },
                // when window width is <= 480px
                550: {
                  slidesPerView: 3
                },
                // when window width is <= 640px
                640: {
                  slidesPerView: 4
                },
                1024: {
                  slidesPerView: 5
                },
                1300: {
                  slidesPerView: 6
                }
            }
        };

        $(".js-clients-carousel").each(function(){
            var _this = $(this);

            clients_slider_config.navigation.nextEl = _this.parent().find('.swiper-button-next');
            clients_slider_config.navigation.prevEl = _this.parent().find('.swiper-button-prev');

            var mySwiper = new Swiper($(this).get(0), clients_slider_config);
        });
    
        $(document).on("shown.bs.tab", ".clients-tabs .nav-link", function(e){
            var newTab = $(e.target).attr("href");
            var newTabContent = $(newTab);
            var sliderElem = newTabContent.find('.js-clients-carousel').get(0);

            clients_slider_config.navigation.nextEl = newTabContent.find('.swiper-button-next');
            clients_slider_config.navigation.prevEl = newTabContent.find('.swiper-button-prev');
            
            var mySwiper = new Swiper(sliderElem, clients_slider_config); 
            mySwiper.navigation.update();

        });        
    }

    // Video youtube (using fancybox)
    $('.js-video-popup').fancybox({
        youtube: {
            controls: 0,
            showinfo: 0
        },
        vimeo: {
            color: 'f00'
        }
    });

    // Resume
    if ($(".js-resume-specialty-dropdown").length) {
        $(".js-resume-specialty-dropdown").on("change", function () {
            var url = $(this).find("option:selected").val();
            window.location.href = url;
        });
    }

    // Header phone switch
    /*(function ($) {
        $(".phones-widget").on("click", ".phones-widget__city", function (e) {
            e.preventDefault();

            if ($(this).hasClass("active")) {
                return false;
            }

            var activeCity = $(this).data("city");

            // Switch city link class
            $(".phones-widget").find(".phones-widget__city.active").removeClass("active");
            $(".phones-widget__city").filter("[data-city='" + activeCity + "']").addClass("active");

            // Switch number
            $(".phones-widget").find(".phones-widget__number.active").removeClass("active");
            $(".phones-widget").find(".phones-widget__number").filter("[data-city='" + activeCity + "']").addClass("active");

            // Switch address
            $(".address-widget").filter(".active").fadeOut(0).removeClass("active");
            $(".address-widget").filter("[data-city='" + activeCity + "']").fadeIn(0).addClass("active");

            // Switch map position
            var map_control = $(".map-controls .map-control").filter("[data-id='" + activeCity + "']");
            if (map_control.length) {
                map_control.trigger("click");
            }
        });
    })(jQuery);*/


    //------------------
    // Sticky header
    //------------------
    (function ($) {
        var header = $("header");
        var sticky_height = 104;
        var sticky_height_mobile = 84;
        var header_trigger_offset;
        var body = $("body");
        var header_total_h = Math.ceil(header.outerHeight());

        $(window).on("load scroll", function () {

            // Desktops
            if ($(window).width() > 1024) {
                var current_offset = $(window).scrollTop();

                header_trigger_offset = header.next().offset().top - sticky_height;

                if ((current_offset >= header_trigger_offset) && (!header.hasClass("header-state-fixed"))) {
                    header.addClass("header-state-fixed");
                    body.css({
                        "padding-top": (header_trigger_offset + sticky_height) + "px"
                    });

                } else if ((current_offset <= header_trigger_offset) && (header.hasClass("header-state-fixed"))) {
                    header.removeClass("header-state-fixed");
                    body.css({
                        "padding-top": "0"
                    });
                }
            }

            // Tablets/Phones
            if ($(window).width() <= 1024) {
                var current_offset = $(window).scrollTop();

                //header_trigger_offset = header.next().offset().top - sticky_height_mobile;
                header_trigger_offset = header_total_h;

                if ((current_offset >= header_total_h) && (!header.hasClass("header-state-fixed"))) {
                    header.css({
                        "top": "-200px"
                    });

                    header.addClass("header-state-fixed");
                    header.stop(true).animate({
                        "top": "0px"
                    }, 400);
                    body.css({
                        "padding-top": (header_trigger_offset) + "px"
                    });

                } else if ((current_offset <= (header_total_h)) && (header.hasClass("header-state-fixed"))) {
                    header.stop(true).animate({
                        "top": "-200px"
                    }, 400);

                    header.removeClass("header-state-fixed");
                    body.css({
                        "padding-top": "0"
                    });
                }
            }
        });

        $(window).on("resize orientationchange", function () {

            if ($(window).width() <= 1024) {
                //header_trigger_offset = header.next().offset().top - sticky_height_mobile;
                header_trigger_offset = sticky_height_mobile + Math.ceil($(".header-mobile-address").outerHeight());
            } else {
                // Desktop                
                header_trigger_offset = header.next().offset().top - sticky_height;
            }

        });
    })(jQuery);
    //------------------
    // /Sticky header
    //------------------


    // Footer link
    if ($(".js-agencies-opener").length) {
        $(".js-agencies-opener").click(function (e) {
            e.preventDefault();

            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(".footer-directions").slideUp(250);
                return false;
            }

            $(".footer-directions").slideDown(250);
            $(this).addClass("active");
        });
    }

    // Select
    if ($('.select').length) {
        $(".select").each(function (index, item) {
            var ph = $(this).data('placeholder') || "";
            var ph_search = $(this).data('search-placeholder') || "Поиск специальности";

            $(item).select2({
                width: '100%',
                placeholder: ph
            });

            $(item).on("select2:open", function (event) {
                if ($(item).hasClass("select-without-search")) {
                    $('.select2-search--dropdown').addClass('hide');
                } else {
                    $('input.select2-search__field').attr('placeholder', ph_search);
                }
                if ($(item).hasClass("select-size-sm")) {
                    $('.select2-dropdown').addClass('select2-dropdown--sm');
                }
            });

            $(item).on("select2:close", function (event) {
                if ($(item).hasClass("select-without-search hide")) {
                    $('.select2-search--dropdown').removeClass('hide');
                }
            });

        });
    }

    // Apply for job modal
    if ($(".js-apply-for-job").length) {
        $(document).on("click", ".js-apply-for-job", function (e) {
            var box = $("#popup-apply");
            var vacancy_name = $(this).data("vacancy") || "";

            // update label in the modal
            box.find(".apply-text__vacancy-title strong").text(vacancy_name);

            // update hidden input value
            box.find("input[name='vacancy_name']").val(vacancy_name);

            $.fancybox.open({
                src: box,
                type: "inline",
                touch: null,
                animationEffect: "fade"
            });
        });
    }

    // Questionnaire form
    if ($("#questionnaire-form").length) {
        var _form = $("#questionnaire-form");
        var q_errorSelector = _form.find('.agreement .checkbox');

        _form.validate({
            errorElement: 'div',
            errorPlacement: function (error, element) {
                if (element.hasClass("input-checkbox")) {
                    q_errorSelector.after(error);
                } else {
                    element.after(error);
                }
            },
            messages: {
                agreement: {
                    required: "Необходимо принять условия передачи информации!"
                }
            }
        });
        _form.children("div").steps({
            headerTag: "h3",
            bodyTag: "section",
            enableCancelButton: false,
            enableFinishButton: false,
            transitionEffect: "fade",
            transitionEffectSpeed: 400,
            onInit: function (event, currentIndex) {
                $(".btn-next").on('click', function (e) {
                    e.preventDefault();

                    _form.children("div:visible").steps("next");
                })
                $("#placeProfile").on('click', function (e) {
                    e.preventDefault();

                    _form.children("div:visible").steps("finish");
                })
            },
            onStepChanging: function (event, currentIndex, newIndex) {
                _form.validate().settings.ignore = ":disabled,:hidden";
                return _form.valid();
            },
            onFinishing: function (event, currentIndex) {
                _form.validate().settings.ignore = ":disabled";
                return _form.valid();
            },
            onFinished: function (event, currentIndex) {
                event.preventDefault();

                // Make ajax request to server
                $.ajax({
                    url: _form.data('url') || 'assets/ajax/questionnaire.php',
                    data: {
                        form: _form.serialize()
                    },
                    type: 'POST',
                    success: function (data) {
                        try {
                            data = $.parseJSON(data);
                            if (data.result) {

                                var success_title = _form.find("[name='success_title']").val() || "";
                                var success_msg = _form.find("[name='success_message']").val() || "";
                                var success = $("#success");

                                success.find(".popup-title").html(success_title);
                                success.find(".success-message p").html(success_msg);

                                setTimeout(function () {
                                    // Show fancybox
                                    $.fancybox.open({
                                        src: "#success",
                                        type: "inline",
                                        touch: null,
                                        opts: {
                                            afterClose: function (instance, current) {
                                                location.reload();
                                            }
                                        }
                                    });
                                }, 500);
                            } else {
                                alert(data.data);
                            }

                        } catch (e) {
                            console.info(data);
                        }

                        $(_form).trigger("reset");
                    },
                    complete: function (jqXHR, textStatus) {
                        $(_form).trigger("reset");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.info(textStatus + ' ' + errorThrown);
                    }
                }); // ajax end

            }
        });
    }

    // Date
    if ($(".flatpickr").length) {
        $(".flatpickr").flatpickr({
            locale: "ru",
            wrap: true,
            //altInput: true,
            //altFormat: "d/m/y",
            disableMobile: true,
            dateFormat: "d/m/Y",
            minDate: "01/01/1900",
            defaultDate: "01/01/1990",
            maxDate: new Date().fp_incr(-5844),
            onReady: function (selectedDates, dateStr, instance) {
                var input = $("input.flatpickr-input");

                input.val('');
                if (!input.hasClass('input')) {
                    input.addClass('input');
                }
            }
        });
    }

    // Mask
    if ($("input[type='tel']").length) {
        $("input[type='tel']").mask('+7 (000) 000-00-00');
    }

    // Contacts
    if ($(".js-contact-directions-trigger").length) {
        $(".js-contact-directions-trigger").click(function (e) {
            e.preventDefault();
            $(".directions-tabs").slideToggle(400);
            $(this).toggleClass("active");
        });
    }

    // Contacts (directions)
    if ($(".js-directions-tab").length) {
        app.directions = $(".directions-content");

        $(document).on("click", ".js-directions-tab", function (e) {
            e.preventDefault();

            if ($(this).hasClass("active")) {
                return false;
            }

            var target = $(this).data("target");

            // Update links
            $(".js-directions-tab.active").removeClass("active");
            $(this).addClass("active");

            // Update tabs
            app.directions.find(".directions-content-box.active").removeClass("active");
            $(target).addClass("active");
        });
    }

    // HR page
    if ($("input[name='instructions_tab_input']").length) {
        var instr_container = $(".hr-instructions-tabs");

        $("input[name='instructions_tab_input']").on("change", function (e) {
            e.preventDefault();

            var tab = $(this).val();
            instr_container.find(".hr-instructions-tab").filter(".active").fadeOut(400).removeClass("active");

            var current_tab = instr_container.find(".hr-instructions-tab").filter("[data-tab='" + tab + "']");
            if (current_tab.length) {
                current_tab.fadeIn(400).addClass("active");
            }
        });
    }

    // HR Letters
    if ($(".alphabetical-order-letters").length) {
        $(".alphabetical-order-letters").on("click", ".letter", function (e) {
            e.preventDefault();

            if ($(this).hasClass("active")) {
                return false;
            }

            var letter = $(this).data("letter");
            $(".letter-circle span").text(letter);

            $(".alphabetical-order-letters .letter").filter(".active").removeClass("active");
            $(this).addClass("active");

            var tabIndex = $(this).data("id");
            $(".alphabetical-order-view__tab").filter(".active").removeClass("active");
            $(".alphabetical-order-view__tab").filter("[data-id='" + tabIndex + "']").addClass("active");
        });
    }

    // Categories dropdown
    if ($(".categories-dropdown-btn").length) {
        var cat_dd_window = $(".categories-dropdown-box");

        $(".categories-dropdown-btn").on("click", function (e) {
            e.preventDefault();

            var btn = $(this);
            btn_text_default = btn.data("text-default") || "";
            btn_text_active = btn.data("text-active") || "";

            if ($(this).hasClass("active")) {
                // Close
                btn.removeClass("active");
                btn.text(btn_text_default);

                cat_dd_window.stop(true).slideUp(250, function () {
                });
            } else {
                // Open
                btn.addClass("active");
                btn.text(btn_text_active);

                cat_dd_window.stop(true).slideDown(function () {
                });
            }
        });
    }

    // Tooltips
    if ($('.tooltip').length) {
        tippy('.tooltip', {
            placement: 'top-start',
            theme: 'light',
            arrow: true,
            arrowType: 'round',
            size: 'large',
            delay: 100,
            duration: [600, 300],
            animation: 'scale',
            inertia: true
        });
    }

    // Scroll to
    if ($('.js-scroll').length) {
        $('.js-scroll').on('click', function (e) {
            e.preventDefault();
            var id = $(this).attr('href');

            $('html, body').animate({
                scrollTop: $(id).offset().top
            }, 1000);
        })
    }

    // Share
    if ($('#share').length) {
        $("#share").jsSocials({
            showLabel: false,
            showCount: false,
            shares: ["vkontakte", "facebook", "twitter"]
        });
    }

    // Modals
    if ($(".js-fancy").length) {
        $(document).on("click", ".js-fancy", function (e) {
            var id = $(this).data("id");

            if (!$("#" + id).length) {
                console.log("Data-id attribute is missing on popup-trigger");
                return false;
            }

            $.fancybox.open({
                src: "#" + id,
                type: "inline",
                touch: null,
                animationEffect: "fade"
            });
        });
    }


    // Menu
    app.menu_active = false;
    app.menu = $("header .main-menu-list");

    $(".menu-button").click(function (e) {
        e.preventDefault();

        if ($(this).hasClass("is-active")) {
            app.menu.stop(true, true).slideUp(250);
            $(this).removeClass("is-active");
            app.menu_active = false;

            $("body").removeClass("menu-opened");
            return false;
        }

        app.menu.stop(true, true).slideDown(250);
        $(this).addClass("is-active");
        app.menu_active = true;
        $("body").addClass("menu-opened");

    });


    // Form submit
    if ($(".form").length) {

        $(".form").one("mouseenter", function () {
            var errorSelector = $(this).find('.agreement .checkbox');

            $(this).validate({
                errorElement: 'div',
                errorPlacement: function (error, element) {
                    if (element.hasClass("input-checkbox")) {
                        errorSelector.after(error);
                    } else {
                        element.after(error);
                    }
                },
                messages: {
                    agreement: {
                        required: "Необходимо принять условия передачи информации!"
                    }
                }

            });
        })

    }

    $(document).on("submit", ".form", function (e) {
        e.preventDefault();
		
        var _form = $(this);
				var goal = _form.attr('data-target');
        var data = _form.serialize();

        if(_form.attr('id') == 'subscription_vacancies') {
            data = data.replace(/specialty=/g, 'specialty[]=');
        }

        // Make ajax request to server
        $.ajax({					
            url: _form.data("url") || 'mail.php',
            data: {
                form: data,
                context_key: typeof CONTEXT_KEY !== 'undefined' ? CONTEXT_KEY : 'web'
            },
            type: 'POST',
            beforeSend: function () {
                if (_form.data("is-modal")) {
                    var fancy = $.fancybox.getInstance();
                    fancy.showLoading();
                }

                _form.find('.error-messages').remove();
            },
            success: function (data) {							
                try {
                    data = $.parseJSON(data);
										//ymetrika 	
										ym(7605367,'reachGoal', goal);
                    if (data.result) {
                        
/* send calltouch */
try {
	if (/spb.kaus-group.ru/.test(document.location.href)){
		var fio = _form.find('input[name="name"]').val(); 
		var phone = _form.find('input[name="phone"]').val(); 
		var mail = _form.find('input[name="email"]').val(); 
		var ct_site_id = '34337';
		var sub = 'Заявка с сайта ' + document.location.hostname;
		var ct_data = {             
		fio: fio,
		phoneNumber: phone,
		email: mail,
		subject: sub,
		sessionId: window.call_value 
		};
		jQuery.ajax({  
		  url: 'https://api-node12.calltouch.ru/calls-service/RestAPI/requests/'+ct_site_id+'/register/', 
		  dataType: 'json', type: 'POST', data: ct_data, async: false
		}); 
	}
} catch(e) { }
/* send calltouch */
                        
                        var success_title = _form.find("[name='success_title']").val() || "";
                        var success_msg = _form.find("[name='success_message']").val() || "";
                        var success = $("#success");

                        success.find(".popup-title").html(success_title);
                        success.find(".success-message p").html(success_msg);

                        setTimeout(function () {
                            var fancyInstance = $.fancybox.getInstance();

                            if (_form.data("is-modal") && fancyInstance) {
                                fancyInstance.setContent(fancyInstance.current, success.clone(false).get(0));
                            } else {
                                // Show fancybox
                                $.fancybox.open({
                                    src: "#success",
                                    type: "inline",
                                    touch: null
                                });
                            }

                            $(_form).trigger("reset");

                            _form.find('select').val(null).trigger("change");

                        }, 500);
                    } else {
                        if (_form.data('type') == 'simple-subscribe') {
                            var errorsStrings = [];
                            var errors = data.errors;

                            if (typeof errors === 'string') {
                                errors = [errors];
                            }

                            $.each(errors, function (k, v) {
                                var s = '<div class="error">' + v + '</div>';

                                if (_form.find('input[name="' + k + '"]').length) {
                                    _form.find('input[name="' + k + '"]').after(s);
                                } else {
                                    errorsStrings.push(s);
                                }
                            });

                            if (errorsStrings.length) {
                                _form.prepend('<div class="error-messages">' + errorsStrings.join("\n") + '</div>');
                            }
                        } else {
                            alert(data.data);
                        }
                    }
                } catch (e) {
                    console.info(data);

                    if (_form.data("is-modal")) {
                        var fancy = $.fancybox.getInstance();
                        fancy.hideLoading();
                    }

                    $(_form).trigger("reset");
                }
            },
            complete: function (jqXHR, textStatus) {

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.info(textStatus + ' ' + errorThrown);
            }
        }); // ajax end
    });


    // Years nav slider
    var filter_swiper = new Swiper('.filter-panel .swiper-container', {
        speed: 400,
        spaceBetween: 0,
        slidesPerView: 3,
        simulateTouch: false,
        navigation: {
            nextEl: '.filter-panel .radio-nav-next',
            prevEl: '.filter-panel .radio-nav-prev',
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 0
            }
        }
    });

    // Reset radio button state 
    // (It remains checked when we are navigating to previously opened page)
    if ((".filter-panel-with-nav").length) {
        $(".filter-panel input[name='year']").prop("checked", false);
    }

    if ($(".js-scroll-to-application").length) {
        $('.js-scroll-to-application').on('click', function (e) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: $("a[name='applicationForm']").offset().top - 104
            }, 1000);
        })
    }
  //menu fix
  ww = window.innerWidth;
  if(ww > 1024){
    $("ul.sub-menu.collapse").mouseenter(function(){
      $(this).addClass("hovered");
    });
    $("ul.sub-menu.collapse").mouseout(function(){
      $(this).removeClass("hovered");
    });
  }
	/*
	if(document.location.pathname != '/contact'){
		document.ondragstart = noselect;
		document.onselectstart = noselect;
	}*/
  //document.oncontextmenu = noselect;
  //function noselect(){return false;}  
	//alpha-filter
	$(".hr-instructions-content .blue-gray-theme").hide();
	$(".hr-instructions-content .alphabetical-order-view__l").hide();
	$(".hr-instructions-content .alphabetical-order-view__tab").each(function(){
		$(this).addClass("active");
	});
	$("div.f-alpha").removeClass("_active");
	$("div.f-all").click(function(){
		if(!$(this).hasClass("_active")){
			$("div.f-alpha").removeClass("_active");
			$(this).addClass("_active");
			$(".hr-instructions-content .blue-gray-theme").hide();
			$(".hr-instructions-content .alphabetical-order-view__l").hide();
			$(".hr-instructions-content .alphabetical-order-view__tab").each(function(){
				$(this).addClass("active");
			});
		}
	});
	$("div.f-alpha").click(function(){
			$("div.f-all").removeClass("_active");
			$(this).addClass("_active");
			$(".hr-instructions-content .blue-gray-theme").show();
			$(".hr-instructions-content .alphabetical-order-view__l").show();
			$(".hr-instructions-content .alphabetical-order-view__tab").each(function(){
				$(this).removeClass("active");
			});
			$(".hr-instructions-content .alphabetical-order-letters .alphabetical-order-letters__in .letter:first-child").trigger("click");
			$(".hr-instructions-content .alphabetical-order-view__tab:first-child").addClass("active");
	});
	$("body").on("click", ".city-info span", function(){
		$(".city-info").fadeOut(250);
	});
	//cityselect hadnler
	$(".city-select").click(function(){
		$.cookie('city_selected', $(this).data('city'), {expires: 7, path: '/', domain: 'kaus-group.ru'});
		$.cookie('city_selected', $(this).data('city'), {expires: 7, path: '/', domain: 'spb.kaus-group.ru'});
		href = $(this).data('href');
		if(href && href != ''){
			document.location.href = href;
		}
	});
	//unisender handler
	$(".it-subscribe-wrap input.subscribe-form-item__btn--btn-submit").click(function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		errors = false;
		n = $('.it-subscribe-wrap form input[name="f_3870279"]').val();
		m = $('.it-subscribe-wrap form input[name="email"]').val();
		c = $(".it-subscribe-wrap form .subscribe-form-agreement-with-terms--checkbox").prop("checked");
		if(n == ''){
			errors = true;
			$('.it-subscribe-wrap form input[name="f_3870279"]').addClass("hasError");
		}
		regexp =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if(!regexp.test(m)){
			errors = true;
			$('.it-subscribe-wrap form input[name="email"]').addClass("hasError");
		}
		if(c === false){
			errors = true;
			$(".it-subscribe-wrap form .subscribe-form-agreement-with-terms--text").addClass("hasError");
		}
		if(errors === false){			
			$.ajax({
				type: 'POST',
				url: '/ajax/unisender.php',
				data: $('.it-subscribe-wrap form').serialize(),
				beforeSend: function(){
					$(".it-subscribe-wrap form").html('<p><img alt="Отправка..." src="/src/img/loading.png" /></p>');
				},
				success: function(data){
					$(".it-subscribe-wrap form").html('<p>Спасибо за ваш отклик! Результаты исследования направим вам на почту.</p>');
				},
				error:  function(xhr, str){
					console.log('При отправке формы возникла ошибка ' + xhr.responseCode);
					$(".it-subscribe-wrap form").html('<p>При отправке формы возникла ошибка. Пожалуйста, попробуйте ещё раз.</p>');
				}
			});
		}
	});
	$("body").on("keyup", '.it-subscribe-wrap form input[name="f_3870279"], .it-subscribe-wrap form input[name="email"]', function(){
		$(this).removeClass("hasError");
	});
	$(".it-subscribe-wrap form .subscribe-form-agreement-with-terms--checkbox").change(function(){
		$(".it-subscribe-wrap form .subscribe-form-agreement-with-terms--text").removeClass("hasError");
	});
});