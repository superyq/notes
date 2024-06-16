// 进入全屏
export const enter = (ele) => {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.mozRequestFullscreen) {
    ele.mozRequestFullscreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  }
};

// 退出全屏
export const exit = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullscreen) {
    document.mozCancelFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

// 被全屏的元素
export const fullEle = () => {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullScreenElement ||
    document.webkitFullScreenElement ||
    null
  );
};

// 当前是否全屏
export const isFull = () => {
  return !!fullEle();
};

// 全屏和非全屏切换
export const toggle = (ele) => {
  isFull() ? exit() : enter(ele);
};
