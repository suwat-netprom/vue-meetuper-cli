export default {
  bind (el, binding) {
    el.__AutoResizeer__ = () => {
      setTimeout(()=> {
        el.style.cssText = 'height: auto'
        const height = el.scrollHeight + 2
        el.style.cssText = 'height:' +height+'px'
      }, 0)
    }

    el.addEventListener('keydown', el.__AutoResizeer__)
  },
  unbind (el) {
    el.removeEventListener('keydown', el.__AutoResizeer__)
  }
}
