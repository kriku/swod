( function ( window ) {

var Slide = function (el) {
  this.el = el;
  this.slides.push(el);
}
Slide.prototype.slides = [];
Slide.prototype.hide = function () { if (this.el) c.add(this.el, 'hide'); }
Slide.prototype.show = function () { if (this.el) c.remove(this.el, 'hide'); }
Slide.prototype.scroll = function () { c.add(this.el, 'scroll'); }
Slide.prototype.unscroll = function () { c.remove(this.el, 'scroll'); }
Slide.prototype.fixed =  function () { c.add(this.el, 'fixed'); }
Slide.prototype.unfixed =  function () { c.remove(this.el, 'fixed'); }

var scr0 = new Slide(document.getElementById('scr0')),
    scr1 = new Slide(document.getElementById('scr1')),
    scr2 = new Slide(document.getElementById('scr2')),
    scr3 = new Slide(document.getElementById('scr3')),
    scr4 = new Slide(document.getElementById('scr4')),
    scr5 = new Slide(document.getElementById('scr5')),
    fing = new Slide(document.getElementById('fingers')),
    mock = new Slide(document.getElementById('mockup')),
    arrow = document.getElementById('arrow'),
    labels = document.getElementById('labels'),
    toLong = document.getElementById('toLong'),
    digits = document.getElementById('digits'),
    imbue = document.getElementById('imbue');

window.scrollTo(0, 0);

var y = oldy = Scroll.y(),
    h = Size.h(),
    scrollInt,
    slide = oldslide = 0,
    slides = [scr0, scr1, scr2, scr3, scr4, scr4, scr4, scr4, scr5];
    otherSlides = [scr0, scr1, scr2, scr3, scr4, scr5];

var toSlide = function (oldslide, slide) {
  // scr0.hide();
  // scr1.hide();
  // scr2.hide();
  // scr3.hide();
  // scr4.hide();
  // scr5.hide();
  // fing.hide();
  // mock.hide();

  slides[slide].show();
  slides[oldslide].show();
    if (slide>3) {
      c.add(mock.el, 'left');
    } else {
      c.remove(mock.el);
    }
  if ((slide>=4)&&(slide<=7)) {
    imbue.className = 'pos' + ( slide - 3 );
  }
  if (slide==oldslide) {
    c.remove(arrow, 'hide');
    if ((slide>0)&&(slide<8)) {
      c.add(labels, 'show');
    } else {
      c.remove(labels, 'show');
    }
    switch (slide) {
      case 1:
        labels.innerHTML = "Для тех кто никогда не сдается";
      break;
      case 2:
        labels.innerHTML = "Для тех кто рискует";
      break;
      case 3:
        labels.innerHTML = "Для тех кто не боится холода";
      break;
      case 4:
      case 5:
      case 6:
      case 7:
        labels.innerHTML = "Приложение SWOD поможет разрешить любой вопрос о спорте, фитнесе и хобби!";
      break;
    }
    (slide==8) && c.add(arrow, 'hide');
  } else {
    ((slide>4)&&(slide<8)) || c.remove(labels, 'show');
    ((slide==4)&&(oldslide>slide)) && c.add(labels, 'show');
    c.add(arrow, 'hide');
    if ((slide>1)&&(slide<4)) {
      c.remove(arrow, 'hide');
    }
    if ((slide>4)&&(slide<8)) {
      scr4.fixed();
      (oldslide<8) && c.remove(arrow, 'hide');
    } else {
      ((slide==4)&&(oldslide>slide)) || scr4.unfixed();
    }
    if ((slide>2)&&(slide<9)) {
      c.add(mock.el, 'left');
    } else {
      c.remove(mock.el, 'left');
    }
    if ((slide==3)&&(oldslide>slide)) {
      c.add(arrow, 'hide');
    }
    if ((slide==4)&&(oldslide>slide)) {
      c.remove(arrow, 'hide');
    }
    if ((slide==1)&&(oldslide>slide)) {
      c.remove(arrow, 'hide');
    }
    if ((slide==0)||(oldslide==0)) {
      mock.show();
      fing.show();
        scr1.scroll();
        fing.scroll();
    } else {
      scr1.unscroll();
      fing.unscroll();
    }
    if ((slide==8)||(oldslide==8)) {
      c.add(arrow, 'hide');
      mock.unfixed();
      c.add(mock.el, 'scr7');
      c.add(scr4.el, 'scr7');
    } else {
      mock.fixed();
      c.remove(mock.el, 'scr7');
      c.remove(scr4.el, 'scr7');
    }
    (oldslide==8) && scr4.unfixed();
  }
}

toSlide(0, 0);


var scrolling = function (n, step) {
  // return ;
  return setInterval(function () {
    window.scrollBy( 0, step );
  }, n);
}

// laggs
var onScroll = function () {
    oldy = y;
    y = Scroll.y();
    slide = Math.round(y / h);
  if (!scrollInt) {
    oldslide = slide;
    if (y - oldy > 0) {
      toSlide(oldslide, slide + 1);
      scrollInt = scrolling( 30, 70 )
    } else if (y - oldy < 0) {
      toSlide(oldslide, slide - 1);
      scrollInt = scrolling( 30, -70 )
    }
  } else {
    if (Math.abs(y/h - oldslide)>0.8) {
      clearInterval(scrollInt);
      scrollInt = null;
      oldslide = slide;
      slide = Math.round(y / h);
      oldy = y = h * slide;
      toSlide(slide, slide);
      window.scrollTo( 0, y );
    }
  }
}


var onResize = function () {
  h = Size.h();
  document.body.style.fontSize = Size.w() / 90 + 'pt';
  if (Size.w()/Size.h()>1.77) {
    scr4.el.style.fontSize = Size.w() / 90 + 'pt';
    toLong.style.height = 58*(Size.w()/Size.h())/1.77 + '%'
    toLong.style.top =53 - 26*(Size.w()/Size.h())/1.77 + '%';
    digits.style.height = 58*(Size.w()/Size.h())/1.77 + '%'
    digits.style.top =53 - 26*(Size.w()/Size.h())/1.77 + '%';
  } else {
    scr4.el.style.fontSize = Size.h() / 50 + 'pt';
    toLong.style.height = '58%';
    toLong.style.top = '26%';
    digits.style.height = '58%';
    digits.style.top = '26%';
  }
  labels.style.fontSize = Size.h() / 30 + 'pt';
}


onEvent(window, 'scroll', onScroll);
onEvent(window, 'resize', onResize);
onEvent(window, 'load', onResize);
onEvent(arrow, 'click', function () { window.scrollBy( 0, 100 ); });

} )(window);