(function () {
    // 自定义轮播图方法
    var defaults = {
        animateTime: 500,
        interval: 3000,
        sliderData: [],
    };

    function BannerSlider($el, opts) {
        if (!(this instanceof BannerSlider))return new BannerSlider($el, opts);
        this.$el = $el;
        this.$el.css('position', 'relative');
        this.opts = $.extend(true, {}, defaults, opts || {});
        this.timer = null;
        this.activeIndex = 0;
        this.sliderLength = this.$el.find('.banner-slide').length;
        if (!this.sliderLength)return;
        this.sliderLastIndex = this.sliderLength - 1;

        this.init();
    }

    BannerSlider.prototype = {
        init: function () {
            this.tempRender();
            this.initStatus();
            this.bindSliderEvent();
            this.start();
        },
        tempRender: function () {
            this.createArrowTemp();
            this.createCircleTemp();
        },
        createArrowTemp: function () {
            this.$el.append(
                '<span class="banner-change banner-prev"></span><span class="banner-change banner-next"></span>'
            );
        },
        createCircleTemp: function () {
            this.$el.append(
                '<div class="banner-cir_box">' + this.createCircleLists() + '</div>'
            );
        },
        createCircleLists: function () {
            var temp = '';
            for (var i = 0; i < this.sliderLength; i++) {
                temp += '<div class="banner-cir">' + (i + 1) + '</div>';
            }
            return temp;
        },

        initStatus: function () {
            this.$bannerSlide = this.$el.find('.banner-slide');
            this.$bannerCir = this.$el.find('.banner-cir');
            this.$prev = this.$el.find('.banner-prev');
            this.$next = this.$el.find('.banner-next');
            this.setBannerActive(0);
        },
        bindSliderEvent: function () {
            var self = this;
            this.$prev.click(function () {
                self.activeIndex--;
                self.bannerSwitch();
            });
            this.$next.click(function () {
                self.activeIndex++;
                self.bannerSwitch();
            });
            this.$bannerCir.click(function () {
                self.activeIndex = $(this).index();
                self.bannerSwitch();
            });
            this.$el.hover(
                function () {
                    clearInterval(self.timer)
                },
                function () {
                    self.start();
                }
            );
        },
        start: function () {
            this.timer = setInterval(this.play.bind(this), this.opts.interval);
        },
        play: function () {
            this.activeIndex++;
            this.bannerSwitch();
        },
        bannerSwitch: function () {
            if (this.activeIndex < 0) {
                this.activeIndex = this.sliderLastIndex
            } else if (this.activeIndex > this.sliderLastIndex) {
                this.activeIndex = 0
            }
            this.setBannerActive(this.activeIndex);
        },
        setBannerActive: function (index) {
            this.$bannerSlide.eq(index).fadeIn(this.opts.animateTime).siblings('.banner-slide').fadeOut(this.opts.animateTime);
            this.$bannerCir.eq(index).addClass('banner-cir_active').siblings('.banner-cir').removeClass('banner-cir_active');
        },
    };

    $.fn.BannerSlider = function (opts) {
        return this.each(function () {
            new BannerSlider(this, opts);
        })
    };

    window.BannerSlider = BannerSlider;

})();