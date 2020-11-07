import {DirectiveOptions} from "vue";

const directive: DirectiveOptions = {
  update: function (el, binding, vNode) {

    // 确保提供的表达式是函数
    if (typeof binding.value !== "function") {
      // 获取组件名称
      const compName = vNode.context;
      // 将警告传递给控制台
      let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be `;
      if (compName) {
        warn += `Found in component '${compName}' `;
      }
      console.warn(warn);
    }

    let pressTimer: NodeJS.Timer | null = null;
    const handler = (e: Event) => {
      binding.value(e);
    };
    const start = (e: Event) => {
      if (e.type === "click") {
        return;
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          // 执行函数
          handler(e);
        }, 500);
      }
    };

    const cancel = () => {
      // 检查计时器是否有值
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };
    document.oncontextmenu = function (event) {
      event.preventDefault();
      return false;
    };
    el.addEventListener('contextmenu',function (e){
      e.preventDefault()
    },false)
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
  }
};
export default directive;