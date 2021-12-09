const ReactDOM = {
  render,
  Component,
};
import Component from "./component";
/**
 *
 * @param {*} comp 函数
 * @param {*} props 组件的属性
 */
function createComponent(comp, props) {
  let instance;
  //原型上有render方法，类组件
  if (comp.prototype && comp.prototype.render) {
    instance = new comp(props);
  } else {
    instance = new Component(props);
    //改变构造函数指向
    instance.constructor = comp;
    //定义render函数
    instance.render = function () {
      return this.constructor(props);
    };
  }
  return instance;
}
function setComponentProp(comp, props) {
  if (!comp.base) {
    comp.componentWillMount && comp.componentWillMount();
  } else if (comp.componentWillReceiveProps) {
    comp.componentWillReceiveProps(props);
  }
  console.log(props);
  comp.props = props;
  renderComponent(comp);
}
export function renderComponent(comp) {
  let base;

  const renderer = comp.render();
  base = _render(renderer);
  comp.base && comp.componentWillUpdate && comp.componentWillUpdate();
  comp.base && comp.componentDidUpdate && comp.componentDidUpdate();
  comp.base || (comp.componentDidMount && comp.componentDidMount());
    //替换节点
  comp.base && comp.base.parentNode?.replaceChild(base, comp.base);
  comp.base = base;
}
/**
 *
 * @param {*} vnode
 * @param {*} container
 */
function render(vnode, container) {
  if (container === undefined) return;
  return container.appendChild(_render(vnode));
}

function _render(vnode) {
  console.log(vnode);
  if (vnode === undefined) return;
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  if (typeof vnode.tag === "function") {
    const comp = createComponent(vnode.tag, vnode.attrs);

    setComponentProp(comp, vnode.attrs);

    return comp.base;
  }
  const { tag, attrs, children } = vnode;
  const domObj = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach((key) => {
      const val = attrs[key];
      setAttributes(key, val, domObj);
    });
  }
  if (children) {
    children.forEach((child) => {
      render(child, domObj);
    });
  }
  console.log(domObj);
  return domObj;
}
/**
 *
 * @param {
 *   style: object | string
 *   title: string
 *   className: string | object
 *   onClick | onBlur : ()=>void
 * } attrs
 * @param {
 *   dom
 * } dom
 */
const setAttributes = (key, value, dom) => {
  if (key === "className") {
    key = "class";
  }
  if (key === "style") {
    if (value && typeof value === "object") {
      for (let k in value) {
        if (typeof value[k] === "number") {
          dom.style[k] = value[k] + "px";
        } else {
          dom.style[k] = value[k];
        }
      }
    } else {
      throw new Error("style must be a object");
    }
  } //处理事件
  else if (/on\w+/.test(key)) {
    key = key.toLowerCase();
    dom[key] = value || null;
  } else {
    if (key in dom) {
      dom[key] = value || "";
    }
    if (value) {
      //有值则更新值
      dom.setAttribute(key, value);
    } else {
      //没有值 移除此属性
      dom.removeAttribute(key);
    }
  }
};
export default ReactDOM;
