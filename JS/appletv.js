Vue.component('card001', {
    props: ['img'],
    template: '#card001-template',
    data() {
        return {
            zHeight: 35,
            rotation: 10,
        }
    },
    methods: {
        render(el, x, y, factor) {
            x *= factor;
            y *= factor;
            el.style.transform =
                'rotateY(' + x + 'deg)' +
                'rotateX(' + y + 'deg)' +
                'translateZ(' + this.zHeight + 'px)' +
                'translateX(' + (3 * -x) + 'px)' +
                'translateY(' + (3 * y) + 'px)';
        },
        shimmer(x, y, dx, dy) {
            this.glimmer.style.background = 'radial-gradient( circle at ' +
                x + 'px ' + y + 'px, ' +
                'rgba(255,255,255,' + Math.max(Math.abs(dx), Math.abs(dy)) / 2 + ') 0%,' +
                'rgba(255,255,255,0) 100% )';
        },
        move(ev) {
            let x = ev.offsetX,
                y = ev.offsetY,
                w = this.$el.offsetWidth,
                w2 = w / 2,
                h = this.$el.offsetHeight,
                h2 = h / 2,
                rot = this.rotation,
                _x, _y;

            // calculate x rotattion
            _x = (1 / w2) * (x - w2) * rot * -0.2;

            // calculate y rotation
            _y = (1 / h2) * (y - h2) * rot;

            // draw
            this.render(this.inner, _x, _y, 0.2);
            // this.render(this.play, _x, _y, 0.5);
            this.shimmer(x, y, (1 / w2) * (x - w2), (1 / h2) * (y - h2));
        },
        stop(ev) {
            this.inner.style.transform = '';
            this.glimmer.style.background = '';
        }
    },
    mounted() {
        this.glimmer = this.$el.querySelector('.glimmer');
        this.inner = this.$el.querySelector('.inner');
        this.play = this.$el.querySelector('.play');
        this.$el.addEventListener('mousemove', ev => {
            window.requestAnimationFrame(() => {
                this.move(ev);
            });
        });
        //新加的
        this.$el.addEventListener('touchstart', ev => {
            window.requestAnimationFrame(() => {
                this.move(ev);
            });
        });
        this.$el.addEventListener('mouseleave', ev => {
            window.requestAnimationFrame(() => {
                this.stop(ev);
            });
        });
        //新加的
        this.$el.addEventListener('touchend', ev => {
            window.requestAnimationFrame(() => {
                this.stop(ev);
            });
        });
    }
});

// instantiate

new Vue({
    el: '#app'
});