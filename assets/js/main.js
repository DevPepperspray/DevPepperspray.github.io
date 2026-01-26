/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	/**
	 * Applies parallax scrolling to an element's background image.
	 * @return {jQuery} jQuery object.
	 */
	$.fn._parallax = function(intensity) {

		var	$window = $(window),
			$this = $(this);

		if (this.length == 0 || intensity === 0)
			return $this;

		if (this.length > 1) {

			for (var i=0; i < this.length; i++)
				$(this[i])._parallax(intensity);

			return $this;

		}

		if (!intensity)
			intensity = 0.25;

		$this.each(function() {

			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t),
				on, off;

			on = function() {

				$bg
					.removeClass('fixed')
					.css('transform', 'matrix(1,0,0,1,0,0)');

				$window
					.on('scroll._parallax', function() {

						var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

						$bg.css('transform', 'matrix(1,0,0,1,0,' + (pos * intensity) + ')');

					});

			};

			off = function() {

				$bg
					.addClass('fixed')
					.css('transform', 'none');

				$window
					.off('scroll._parallax');

			};

			// Disable parallax on ..
				if (browser.name == 'ie'			// IE
				||	browser.name == 'edge'			// Edge
				||	window.devicePixelRatio > 1		// Retina/HiDPI (= poor performance)
				||	browser.mobile)					// Mobile devices
					off();

			// Enable everywhere else.
				else {

					breakpoints.on('>large', on);
					breakpoints.on('<=large', off);

				}

		});

		$window
			.off('load._parallax resize._parallax')
			.on('load._parallax resize._parallax', function() {
				$window.trigger('scroll');
			});

		return $(this);

	};

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Background.
		$wrapper._parallax(0.925);

	// Nav Panel.

		// Toggle.
			$navPanelToggle = $(
				'<a href="#navPanel" id="navPanelToggle">Menu</a>'
			)
				.appendTo($wrapper);

			// Change toggle styling once we've scrolled past the header.
				$header.scrollex({
					bottom: '5vh',
					enter: function() {
						$navPanelToggle.removeClass('alt');
					},
					leave: function() {
						$navPanelToggle.addClass('alt');
					}
				});

		// Panel.
			$navPanel = $(
				'<div id="navPanel">' +
					'<nav>' +
					'</nav>' +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-navPanel-visible'
				});

			// Get inner.
				$navPanelInner = $navPanel.children('nav');

			// Move nav content on breakpoint change.
				var $navContent = $nav.children();

				breakpoints.on('>medium', function() {

					// NavPanel -> Nav.
						$navContent.appendTo($nav);

					// Flip icon classes.
						$nav.find('.icons, .icon')
							.removeClass('alt');

				});

				breakpoints.on('<=medium', function() {

					// Nav -> NavPanel.
						$navContent.appendTo($navPanelInner);

					// Flip icon classes.
						$navPanelInner.find('.icons, .icon')
							.addClass('alt');

				});

			// Hack: Disable transitions on WP.
				if (browser.os == 'wp'
				&&	browser.osVersion < 10)
					$navPanel
						.css('transition', 'none');

	// Intro.
		var $intro = $('#intro');

		if ($intro.length > 0) {

			// Hack: Fix flex min-height on IE.
				if (browser.name == 'ie') {
					$window.on('resize.ie-intro-fix', function() {

						var h = $intro.height();

						if (h > $window.height())
							$intro.css('height', 'auto');
						else
							$intro.css('height', h);

					}).trigger('resize.ie-intro-fix');
				}

			// Hide intro on scroll (> small).
				breakpoints.on('>small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'bottom',
						top: '25vh',
						bottom: '-50vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

				});

			// Hide intro on scroll (<= small).
				breakpoints.on('<=small', function() {

					$main.unscrollex();

					$main.scrollex({
						mode: 'middle',
						top: '15vh',
						bottom: '-15vh',
						enter: function() {
							$intro.addClass('hidden');
						},
						leave: function() {
							$intro.removeClass('hidden');
						}
					});

			});

		}

})(jQuery);

/* ==============================================
   DEV P.SPRAY PORTFOLIO ENHANCEMENTS
   ============================================== */

(function($) {
    'use strict';

    // Wait for document to be fully loaded
    $(document).ready(function() {

        /* 1. FORM VALIDATION & SUBMISSION */
        const contactForm = $('#contactForm');
        if (contactForm.length) {
            contactForm.on('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                let isValid = true;
                const requiredFields = $(this).find('[required]');
                
                requiredFields.each(function() {
                    if (!$(this).val().trim()) {
                        $(this).addClass('error');
                        isValid = false;
                    } else {
                        $(this).removeClass('error');
                    }
                });
                
                if (isValid) {
                    // Show success message
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    
                    // In production, you would send the form data to a server
                    // Example: $.ajax({...});
                    
                    // Reset form
                    $(this)[0].reset();
                } else {
                    showNotification('Please fill in all required fields.', 'error');
                }
            });
        }

        /* 2. SMOOTH SCROLL TO ANCHORS */
        $('a[href^="#"]').not('[href="#"]').click(function(e) {
            const target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 70
                }, 1000, 'easeInOutExpo');
            }
        });

        /* 3. ACTIVE NAV LINK HIGHLIGHTING */
        $(window).on('scroll', function() {
            const scrollPosition = $(window).scrollTop() + 100;
            
            $('section[id]').each(function() {
                const sectionTop = $(this).offset().top;
                const sectionBottom = sectionTop + $(this).outerHeight();
                const sectionId = $(this).attr('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    $('a[href="#' + sectionId + '"]').addClass('active');
                } else {
                    $('a[href="#' + sectionId + '"]').removeClass('active');
                }
            });
        });

        /* 4. PROJECT IMAGE LAZY LOADING */
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.classList.add('loaded');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            $('img[data-src]').each(function() {
                imageObserver.observe(this);
            });
        }

        /* 5. SKILL PROGRESS BARS ANIMATION */
        $(window).on('scroll', function() {
            $('.skill-bar').each(function() {
                const elementTop = $(this).offset().top;
                const elementBottom = elementTop + $(this).outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    const skillLevel = $(this).find('.skill-level');
                    const width = skillLevel.data('width') || '100%';
                    
                    skillLevel.css('width', width);
                    $(this).addClass('animated');
                }
            });
        });

        /* 6. COPY EMAIL TO CLIPBOARD */
        $('.copy-email').on('click', function(e) {
            e.preventDefault();
            const email = 'michaelakinwunmi76@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!', 'success');
            }).catch(err => {
                console.error('Failed to copy: ', err);
                showNotification('Failed to copy email', 'error');
            });
        });

        /* 7. DARK/LIGHT MODE TOGGLE */
        const themeToggle = $('#themeToggle');
        if (themeToggle.length) {
            // Check for saved theme or prefer-color-scheme
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
            
            if (savedTheme === 'dark') {
                $('body').addClass('dark-mode');
                themeToggle.html('<i class="fas fa-sun"></i> Light Mode');
            }
            
            themeToggle.on('click', function() {
                $('body').toggleClass('dark-mode');
                const isDark = $('body').hasClass('dark-mode');
                
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                $(this).html(isDark ? 
                    '<i class="fas fa-sun"></i> Light Mode' : 
                    '<i class="fas fa-moon"></i> Dark Mode'
                );
            });
        }

        /* 8. VIEW COUNTER (SIMULATED) */
        if (localStorage.getItem('viewCount')) {
            let count = parseInt(localStorage.getItem('viewCount')) + 1;
            localStorage.setItem('viewCount', count);
            $('#viewCount').text(count);
        } else {
            localStorage.setItem('viewCount', 1);
            $('#viewCount').text(1);
        }

        /* 9. BACK TO TOP BUTTON */
        const backToTop = $('#backToTop');
        if (backToTop.length) {
            $(window).on('scroll', function() {
                if ($(window).scrollTop() > 300) {
                    backToTop.fadeIn();
                } else {
                    backToTop.fadeOut();
                }
            });
            
            backToTop.on('click', function() {
                $('html, body').animate({ scrollTop: 0 }, 800);
                return false;
            });
        }

        /* 10. PROJECT FILTERING */
        $('.filter-btn').on('click', function() {
            const filter = $(this).data('filter');
            
            $('.filter-btn').removeClass('active');
            $(this).addClass('active');
            
            if (filter === 'all') {
                $('.project-item').fadeIn(400);
            } else {
                $('.project-item').fadeOut(200, function() {
                    $('.project-item[data-category*="' + filter + '"]').fadeIn(400);
                });
            }
        });

        /* 11. NOTIFICATION SYSTEM */
        window.showNotification = function(message, type = 'info') {
            const notification = $(
                '<div class="notification ' + type + '">' +
                    '<span>' + message + '</span>' +
                    '<button class="close-notification">&times;</button>' +
                '</div>'
            );
            
            $('body').append(notification);
            notification.css('top', '-100px').animate({ top: '20px' }, 300);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                notification.animate({ top: '-100px' }, 300, function() {
                    $(this).remove();
                });
            }, 5000);
            
            // Manual close
            notification.find('.close-notification').on('click', function() {
                notification.animate({ top: '-100px' }, 300, function() {
                    $(this).remove();
                });
            });
        };

        /* 12. CURSOR EFFECT (OPTIONAL) */
        if ($('#cursor').length === 0) {
            $('body').append('<div id="cursor"></div>');
            
            const cursor = $('#cursor');
            $(document).on('mousemove', function(e) {
                cursor.css({
                    left: e.pageX + 'px',
                    top: e.pageY + 'px'
                });
            });
            
            $('a, button, .project-item, .service-box').on('mouseenter', function() {
                cursor.addClass('hover');
            }).on('mouseleave', function() {
                cursor.removeClass('hover');
            });
        }

        /* 13. PAGE LOAD ANIMATIONS */
        $('.fade-in-up').each(function(i) {
            $(this).css({
                'opacity': '0',
                'transform': 'translateY(20px)'
            });
            
            setTimeout(() => {
                $(this).animate({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                }, 600, 'easeOutCubic');
            }, i * 200);
        });

        /* 14. FORM CHARACTER COUNTER */
        $('textarea[maxlength]').each(function() {
            const maxLength = $(this).attr('maxlength');
            const counter = $('<small class="char-counter">0/' + maxLength + '</small>');
            $(this).after(counter);
            
            $(this).on('input', function() {
                const length = $(this).val().length;
                counter.text(length + '/' + maxLength);
                
                if (length > maxLength * 0.9) {
                    counter.addClass('warning');
                } else {
                    counter.removeClass('warning');
                }
            });
        });

        /* 15. PRINT RESUME FUNCTION */
        $('.print-resume').on('click', function() {
            window.print();
        });

        /* 16. ANALYTICS EVENT TRACKING */
        $('a[target="_blank"], .button, .project-link').on('click', function() {
            const label = $(this).text().trim() || $(this).attr('href');
            // In production, send to Google Analytics
            // gtag('event', 'click', { 'event_category': 'engagement', 'event_label': label });
            console.log('Clicked:', label);
        });

        /* 17. RESPONSIVE VIDEO EMBEDS */
        $('iframe[src*="youtube"], iframe[src*="vimeo"]').each(function() {
            $(this).wrap('<div class="video-container"></div>');
        });

        /* 18. SCROLL PROGRESS INDICATOR */
        if ($('#scrollProgress').length === 0) {
            $('body').append('<div id="scrollProgress"></div>');
            
            $(window).on('scroll', function() {
                const winHeight = $(window).height();
                const docHeight = $(document).height();
                const scrollTop = $(window).scrollTop();
                const progress = (scrollTop / (docHeight - winHeight)) * 100;
                
                $('#scrollProgress').css('width', progress + '%');
            });
        }

        /* 19. TEXT ANIMATION (TYPEWRITER EFFECT) */
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.text('');
            
            function type() {
                if (i < text.length) {
                    element.append(text.charAt(i));
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }
        
        // Usage example for hero text
        // typeWriter($('#hero-text'), 'Data Analyst × Frontend Developer', 50);

        /* 20. INITIALIZE ALL COMPONENTS */
        console.log('Dev P.Spray Portfolio initialized successfully!');
        
        // Trigger initial scroll for progress bars
        $(window).trigger('scroll');
    });

})(jQuery);

/* ==============================================
   UTILITY FUNCTIONS
   ============================================== */

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}