import { addClass, removeClass } from "@/util/helpers";

function tooltipShow(event) {
  addClass(event.target.nextSibling, "tooltip-show");
}

function tooltipHide(event) {
  removeClass(event.target.nextSibling, "tooltip-show");
}

export default {
  install(app) {
    app.directive("tooltip", {
      mounted(el, binding) {
        const span = document.createElement("SPAN");
        const text = document.createTextNode(
          `Seats available: ${binding.value}`
        );
        span.appendChild(text);
        addClass(span, "tooltip");
        el.appendChild(span);

        const div = el.childNodes[0];
        div.addEventListener("mouseover", tooltipShow);
        div.addEventListener("mouseout", tooltipHide);
        div.addEventListener("touchstart", tooltipShow);
        div.addEventListener("touchend", tooltipHide);
      },
      unmounted(el) {
        const div = el.childNodes[0];
        div.removeEventListener("mouseover", tooltipShow);
        div.removeEventListener("mouseout", tooltipHide);
        div.removeEventListener("touchstart", tooltipShow);
        div.removeEventListener("touchend", tooltipHide);
      }
    });
  }
};
