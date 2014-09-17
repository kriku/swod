// growing

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
    arrow = new Slide(document.getElementById('arrow')),
    video = new Slide(document.getElementById('video')),
    labels = document.getElementById('labels'),
    toLong = document.getElementById('toLong'),
    digits = document.getElementById('digits'),
    appStore = document.getElementById('appStore'),
    gooPlay = document.getElementById('gooPlay'),
    more = document.getElementById('more'),
    watch = document.getElementById('watch'),
    unwatch = document.getElementById('unwatch'),
    imbue = document.getElementById('imbue');

window.scrollTo(0, 0);

var y = oldy = Scroll.y(),
    h = Size.h(),
    scrollInt,
    slide = oldslide = 0,
    slides = [scr0, scr1, scr2, scr3, scr4, scr4, scr4, scr4, scr5];
    otherSlides = [scr0, scr1, scr2, scr3, scr4, scr5],
    isScen2 = false;

var toSlide = function (oldslide, slide) {
  if (!isScen2) {
  // scr0.hide();
  // scr1.hide();
  // scr2.hide();
  // scr3.hide();
  // scr4.hide();
  // scr5.hide();
  // fing.hide();
  // mock.hide();
  if (slide<0) slide = 0;
  if (slide>8) slide = 8;
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
    arrow.show();
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
    (slide==8) && arrow.hide();
  } else {
    ((slide>4)&&(slide<8)) || c.remove(labels, 'show');
    ((slide==4)&&(oldslide>slide)) && c.add(labels, 'show');

    arrow.hide();

    if ((slide>1)&&(slide<4)) {
      arrow.show();
    }

    if ((slide>4)&&(slide<8)) {
      scr4.fixed();
      (oldslide<8) && arrow.show();
    } else {
      ((slide==4)&&(oldslide>slide)) || scr4.unfixed();
    }

    if ((slide>2)&&(slide<9)) {
      c.add(mock.el, 'left');
    } else {
      c.remove(mock.el, 'left');
    }

    if ((slide==3)&&(oldslide>slide)) {
      arrow.hide();
    }

    if ((slide==4)&&(oldslide>slide)) {
      arrow.show();
    }

    if ((slide==1)&&(oldslide>slide)) {
      arrow.show();
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
      arrow.hide();
      mock.unfixed();
      c.add(mock.el, 'on7');
      c.add(scr4.el, 'on7');
    } else {
      mock.fixed();
      c.remove(mock.el, 'on7');
      c.remove(scr4.el, 'on7');
    }

    (oldslide==8) && scr4.unfixed();

  }
} else {
  c.add(mock.el, 'left');

  if ((oldslide==0)||(slide==0)) {
    arrow.hide();
    scr4.unfixed();
  } else {
    scr4.fixed();
  }

  if ((slide==5)||(oldslide)==5) {
    arrow.hide();
    mock.unfixed();
    scr4.unfixed();
    c.add(mock.el, 'on4');
    c.add(scr4.el, 'on4');
  } else {
    mock.fixed();
    c.remove(mock.el, 'on4');
    c.remove(scr4.el, 'on4');
  }

  if ((slide>0)&&(slide<5)) {
    c.add(labels, 'show');
  } else {
    c.remove(labels, 'show');
  }

  if ((slide>=1)&&(slide<=4)) {
    imbue.className = 'pos' + slide;
  }

  if ((slide==oldslide)&&((slide==0)||(slide==1)||(slide==4))) {
    arrow.show();
  }

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
  document.body.style.fontSize = Size.w() / 110 + 'pt';
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

onResize();

onEvent(arrow.el, 'click', function () { 
  window.scrollBy( 0, 100 ); 
});

onEvent(appStore, 'click', function () {
  more.style.display = 'block';
});

onEvent(gooPlay, 'click', function () {
  more.style.display = 'block';
});

onEvent(watch, 'click', function () {
  video.show();
  arrow.hide();
  document.body.style.overflow = 'hidden';
});

onEvent(unwatch, 'click', function () {
  video.hide();
  arrow.show();
  document.body.style.overflow = 'visible';
});

var toAnd = document.getElementById('toAnd'),
    toIos = document.getElementById('toIos'),
    phoneMain = document.getElementById('phoneMain'),
    phoneSub = document.getElementById('phoneSub'),
    scensLi = document.getElementsByTagName('LI');

onEvent(toAnd, 'click', function () {
  c.add(toAnd, 'active');
  c.remove(toIos, 'active');
  phoneMain.className = 'phoneAnd';
  phoneSub.className = 'phoneIos';
});

onEvent(toIos, 'click', function () {
  c.remove(toAnd, 'active');
  c.add(toIos, 'active');
  phoneMain.className = 'phoneIos';
  phoneSub.className = 'phoneAnd';
});

var scen1 = document.getElementById('scen1'),
    scen2 = document.getElementById('scen2'),
    hideScen2 = document.getElementById('hideScen2');

onEvent(scen1, 'click', function () {
  c.add(scen1, 'active');
  c.remove(scen2, 'active');
  hideScen2.style.display = '';
  document.body.style.height = '';
  scr4.el.style.top = '';
  scr5.el.style.top = '';
  isScen2 = false;
  scensLi[0].innerHTML = 'Как построить фигуру мечты';
  scensLi[1].innerHTML = 'Кто лучше всех учит плавать в моем городе';
  scensLi[2].innerHTML = 'Где играть в волейбол этим летом';
  scensLi[3].innerHTML = 'Куда отправиться в поисках условий для экстремального спорта';
});

onEvent(scen2, 'click', function () {
  c.add(scen2, 'active');
  c.remove(scen1, 'active');
  hideScen2.style.display = 'none';
  document.body.style.height = '600%';
  scr4.el.style.top = '100%';
  scr5.el.style.top = '500%';
  isScen2 = true;
  scensLi[0].innerHTML = 'Как построить другую фигуру мечты';
  scensLi[1].innerHTML = 'Кто ещё лучше всех учит плавать в моем городе';
  scensLi[2].innerHTML = 'Где наконец играть в волейбол этим летом';
  scensLi[3].innerHTML = 'Куда отправиться в поисках условий для экстремального спорта';
  labels.innerHTML = "Приложение SWOD поможет разрешить любой вопрос о спорте, фитнесе и хобби!";
});

} )(window);