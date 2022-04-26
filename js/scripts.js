"use strict";

var formSelectHead = document.querySelector('.select-inner__head'),
    formSelectList = document.querySelector('.select-inner__list'),
    formSelectedItems = document.querySelectorAll('.select-inner__list span'),
    formSelectedText = document.querySelector('.select-inner__head span');

var addActive = function addActive() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  items.forEach(function (elem) {
    return elem.classList.add('active');
  });
};

var removeActive = function removeActive() {
  for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    items[_key2] = arguments[_key2];
  }

  items.forEach(function (elem) {
    return elem.classList.remove('active');
  });
};

formSelectHead.addEventListener('click', function (e) {
  e.target.classList.contains('active') ? removeActive(formSelectHead, formSelectList) : addActive(formSelectHead, formSelectList);
});
formSelectedItems.forEach(function (elem) {
  elem.addEventListener('click', function () {
    formSelectedItems.forEach(function (item) {
      return item.classList.remove('selected');
    });
    elem.classList.add('selected');
    formSelectedText.innerHTML = elem.innerHTML;
    removeActive(formSelectHead, formSelectList);
  });
}); // Mask phone

var maskPhone = function maskPhone(event) {
  var keyCode;
  event.keyCode && (keyCode = event.keyCode);
  var pos = event.target.selectionStart;
  if (pos < 3) event.preventDefault();
  var matrix = "+38 (___) ___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = event.target.value.replace(/\D/g, ""),
      newValue = matrix.replace(/[_\d]/g, function (a) {
    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
  });
  i = newValue.indexOf("_");

  if (i != -1) {
    i < 5 && (i = 3);
    newValue = newValue.slice(0, i);
  }

  var reg = matrix.substr(0, event.target.value.length).replace(/_+/g, function (a) {
    return "\\d{1," + a.length + "}";
  }).replace(/[+()]/g, "\\$&");
  reg = new RegExp("^" + reg + "$");
  if (!reg.test(event.target.value) || event.target.value.length < 5 || keyCode > 47 && keyCode < 58) event.target.value = newValue;
  if (event.type == "blur" && event.target.value.length < 5) event.target.value = "";
};

document.querySelectorAll('input[type="tel"]').forEach(function (elem) {
  return elem.addEventListener("input", maskPhone, false);
});
document.querySelectorAll('input[type="tel"]').forEach(function (elem) {
  return elem.addEventListener("focus", maskPhone, false);
});
document.querySelectorAll('input[type="tel"]').forEach(function (elem) {
  return elem.addEventListener("blur", maskPhone, false);
});
document.querySelectorAll('input[type="tel"]').forEach(function (elem) {
  return elem.addEventListener("keydown", maskPhone, false);
}); // Dynamic date

var dateFooterSpan = document.querySelector('.footer-inner__copy span');
dateFooterSpan.innerHTML = new Date().getFullYear(); // Scroll element for ID

var elementScrollToById = document.querySelectorAll('.anchor');
elementScrollToById.forEach(function (elem) {
  elem.addEventListener('click', function (e) {
    e.preventDefault();
    removeActive(document.body, document.documentElement, menuInnerMob);
    var scrollElem = document.getElementById(elem.getAttribute('href').replace('#', ''));
    scrollElem.scrollIntoView({
      behavior: "smooth"
    });
  });
}); // Menu mob

var menuOpenMib = document.querySelector('.header-links__menu-mob'),
    menuInnerMob = document.querySelector('.popup-menu'),
    menuCloseMib = document.querySelector('.popup-menu .close');
menuOpenMib.addEventListener('click', function () {
  return addActive(document.body, document.documentElement, menuInnerMob);
});
menuCloseMib.addEventListener('click', function () {
  return removeActive(document.body, document.documentElement, menuInnerMob);
}); // Form send

var formInner = document.querySelector('.connect-inner__form form');
formInner.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = e.target.querySelector('input[name="name"]').value,
      phone = e.target.querySelector('input[name="phone"]').value,
      mail = e.target.querySelector('input[name="email"]').value,
      select = e.target.querySelector('.select-inner__head span').innerHTML,
      comment = e.target.querySelector('textarea').value;
  var data = {
    'Ім’я': name ? name : 'Не заповнено',
    'Телефон': phone ? phone : 'Не заповнено',
    'E-mail': mail ? mail : 'Не заповнено',
    'Вибраний пункт': select,
    'Коментар': comment ? comment : 'Не заповнено'
  };
  
  fetch('senda.php', {
    method: 'post',
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.text();
  }).then(function (data) {
    console.log(data);
  })["catch"](function (error) {
    console.error(error);
  });
});

//Fondy
// fetch('https://pay.fondy.eu/api/checkout/url/')
// .then(function (response) {
//   console.log(response)
// })
// .catch(function (error) {
//   console.error(error)
// })
