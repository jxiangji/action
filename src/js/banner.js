(function () {
    // 自定义轮播图方法
    var defaults = {
        animateTime: 500,
        interval: 3000,
        sliderData: [],
    };

    function BannerSlider($selector, opts) {
        if (!(this instanceof BannerSlider))return new BannerSlider($selector, opts);
        this.$selector = $selector;
        this.opts = $.extend(true, {}, defaults, opts);
        this.timer = null;
        this.activeIndex = 0;
        this.sliderLength = this.opts.sliderData.length || this.$selector.find('.banner-slide').length;
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
            this.$selector.append(
                '<img class="banner-change banner-prev" src="/${res}/images/bx-prev.png"><img class="banner-change banner-next" src="/${res}/images/bx-next.png">'
            );
        },
        createCircleTemp: function () {
            this.$selector.append(
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
            this.$bannerSlide = this.$selector.find('.banner-slide');
            this.$bannerCir = this.$selector.find('.banner-cir');
            this.$prev = this.$selector.find('banner-prev');
            this.$next = this.$selector.find('banner-next');
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
            this.$selector.hover(
                function () {
                    clearInterval(this.timer)
                },
                function () {
                    this.start();
                }
            );
        },
        start: function () {
            this.timer = setInterval(this.play, this.opts.interval);
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
            this.$bannerSlide.eq(index).fadeIn(this.opts.animateTime).siblings().fadeOut(this.opts.animateTime);
            this.$bannerCir.eq(index).addClass('banner-cir_active').siblings().removeClass('banner-cir_active');
        },
    };

    $.fn.BannerSlider = function (opts) {
        return this.each(function () {
            new BannerSlider(this, opts);
        })
    };

    window.BannerSlider = BannerSlider;

})();