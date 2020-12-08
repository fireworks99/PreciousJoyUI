window.onload = function () {


  /*---------------------Add tags---------------------*/

  // To get the tags which input by the user.
  // let tags = [];
  // $(".pj-add-tags-items").each(function () {
  //   let s = $(this)[0].innerText;
  //   s = s.substr(0, s.length - 1);
  //   tags.push(s);
  // });

  if(document.getElementById("pj-add-tags-wrapper") !== null) {

    let addTagsNum = 10;
    const oneRem = parseInt(getStyle(document.getElementsByTagName("body")[0], "fontSize"));
    const addTagsWrapper = document.getElementById("pj-add-tags-wrapper");
    const addTagsLeft = document.getElementById("pj-add-tags-left");
    const addTagsInputItem = document.getElementById("pj-add-tags-input-item");
    const addTagsContainer = document.getElementById("pj-add-tags-container");
    addTagsInputItem.onkeydown = function (e) {
      if(e && e.key && e.key === "Enter") {
        if(addTagsNum > 0 && this.value !== "") {

          let wrapperWidth = parseInt(getStyle(addTagsWrapper, "width"));
          if(this.value.length * oneRem >= wrapperWidth) {
            alert("标签过长!");
          } else {
            let item = document.createElement("div");
            item.setAttribute("class", "pj-add-tags-items");
            item.innerHTML = `<div>${this.value}<span>x</span></div>`;
            addTagsContainer.appendChild(item);
            this.value = "";
            addTagsLeft.innerText = `还可以添加${--addTagsNum}个标签`;
            listenHeight();
          }
        } else if (addTagsNum === 0) {
          alert("Σ(°△°|||) 允许添加的标签已经达到上限了");
        }
      }
    };

    addTagsContainer.onclick = function (e) {
      if(e.target.className === "pj-add-tags-items") {
        e.target.parentNode.removeChild(e.target);
        addTagsLeft.innerText = `还可以添加${++addTagsNum}个标签`;
      } else if(e.target.parentNode.className === "pj-add-tags-items") {
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        addTagsLeft.innerText = `还可以添加${++addTagsNum}个标签`;
      } else if(e.target.parentNode.parentNode.className === "pj-add-tags-items") {
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
        addTagsLeft.innerText = `还可以添加${++addTagsNum}个标签`;
      }
      listenHeight();
    }

    let addTagsFlag = false;
    function listenHeight() {
      let containerHeight = parseInt(getStyle(addTagsContainer, "height"));
      let lines = 1;
      for(lines = 11; lines >= 1; --lines) {
        if(lines * 2.5 * oneRem - 1 === containerHeight) {
          break;
        }
      }
      if(lines === 1) {
        let wrapperWidth = parseInt(getStyle(addTagsWrapper, "width"));
        let inputItemWidth = parseInt(getStyle(addTagsInputItem, "width"));
        let leftWidth = parseInt(getStyle(addTagsLeft, "width"));
        let containerWidth = parseInt(getStyle(addTagsContainer, "width"));
        addTagsFlag = wrapperWidth * 0.9 < containerWidth + inputItemWidth + leftWidth;
      }
      if(lines !== 1 || addTagsFlag) {
        ++lines;
        addTagsWrapper.style.height = lines * 2.5 * oneRem + "px";
        addTagsInputItem.style.position = "absolute";
        addTagsInputItem.style.bottom = 0 + "px";
        addTagsInputItem.style.left = 0.5 * oneRem + "px";
      }
      if(addTagsFlag === false) {
        addTagsWrapper.style.height = 2.5 * oneRem + "px";
        addTagsInputItem.style.position = "relative";
        addTagsInputItem.style.left = 0 + "px";
      }

    }
  }


  /*---------------------Add tags---------------------*/


}

/*---------------------Carousel---------------------*/

function PJCarousel(curIdxBgc="black", speed=20, timeout=3000) {
  let pj_carousel_outer_width = parseInt(getStyle(document.getElementById("pj-carousel-outer"), "width"));
  let pj_carousel_outer_height = parseInt(getStyle(document.getElementById("pj-carousel-outer"), "height"));
  let pj_carousel_outer_padding = parseInt(getStyle(document.getElementById("pj-carousel-outer"), "padding"));

  let pj_carousel_item_width = pj_carousel_outer_width - pj_carousel_outer_padding * 2;
  let pj_carousel_item_height = pj_carousel_outer_height - pj_carousel_outer_padding * 2;

  const ul = document.getElementById("pj-carousel-boxList");
  const itemArr = document.getElementsByClassName("pj-carousel-item");
  for(let i = 0; i < itemArr.length; ++i) {
    itemArr[i].style.width = pj_carousel_item_width + "px";
    itemArr[i].style.height = pj_carousel_item_height + "px";
    // itemArr[i].style.marginLeft = pj_carousel_outer_padding + "px";
    itemArr[i].style.marginRight = pj_carousel_outer_padding + "px";
  }
  // ul.style.height =  pj_carousel_item_height + "px";
  ul.style.width = (itemArr.length + 1) * (pj_carousel_item_width + pj_carousel_outer_padding) + "px";

  const nav = document.getElementById("pj-carousel-nav");
  const outer = document.getElementById("pj-carousel-outer");
  nav.style.left = (outer.offsetWidth - nav.offsetWidth) / 2 + "px";

  let idx = 0, timer;

  const allA = document.getElementsByClassName("pj-carousel-a");
  allA[idx].style.backgroundColor = curIdxBgc;

  for(let i = 0; i < allA.length; ++i) {
    allA[i].num = i;
    allA[i].onclick = function () {
      // allA[i].onmouseover = function () {
      clearInterval(timer);
      idx = this.num;
      setA();
      move(ul, speed, pj_carousel_outer_padding + -(pj_carousel_item_width + pj_carousel_outer_padding) * idx, "left", function () {
        autoChange();
      });
    }
  }

  autoChange();

  function setA() {

    if(idx >= itemArr.length - 1) {
      idx = 0;

      ul.style.left = pj_carousel_outer_padding + "px";
    }

    for(let i = 0; i < allA.length; ++i) {
      allA[i].style.backgroundColor = "";
    }
    allA[idx].style.backgroundColor = curIdxBgc;
  }

  function autoChange() {
    timer = setInterval(function () {
      idx++;
      idx %= itemArr.length;

      move(ul, speed, pj_carousel_outer_padding + -(pj_carousel_item_width + pj_carousel_outer_padding) * idx, "left", function () {
        setA();
      });
    }, timeout);
  }

}

/*---------------------Carousel---------------------*/

/*---------------------Tools------------------------*/

function getStyle(obj, name) {
  return window.getComputedStyle ? getComputedStyle(obj, null)[name] : obj.currentStyle[name];
}

function move(obj, speed, aim, attr, callback) {
  clearInterval(obj.timer);

  let current = parseInt(getStyle(obj, attr));
  speed = current > aim ? -speed : speed;

  obj.timer = setInterval(function () {
    let oldValue = parseInt(getStyle(obj, attr));
    let newValue = oldValue + speed;
    newValue = speed < 0 && newValue < aim ? aim: newValue;
    newValue = speed > 0 && newValue > aim ? aim: newValue;

    obj.style[attr] = newValue + "px";

    if(newValue === aim) {
      clearInterval(obj.timer);

      // 先确定有，再执行
      callback && callback();
    }
  }, 30);
}

function addClass(obj, cn) {
  if(!hasClass(obj, cn))
    obj.className += " " + cn;
}

function hasClass(obj, cn) {
  let reg = new RegExp("\\b" + cn + "\\b");
  return reg.test(obj.className);
}

function removeClass(obj, cn) {
  let reg = new RegExp("\\b" + cn + "\\b");
  obj.className = obj.className.replace(reg, "");
}

function toggleClass(obj, cn) {
  if(hasClass(obj, cn))
    removeClass(obj, cn);
  else
    addClass(obj, cn);
}

/*---------------------Tools------------------------*/