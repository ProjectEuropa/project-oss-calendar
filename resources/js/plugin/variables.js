
const VariablesPlugin = {}
VariablesPlugin.install = function (Vue) {
  let calendar = null
  const setCalendar = cal => {
    calendar = cal
  }
  const getCalendar = () => {
    return calendar
  }

  Vue.prototype.$setCalendar = cal => {
    setCalendar(cal)
  }
  Vue.prototype.$getCalendar = () => {
    return getCalendar()
  }


  // モバイル判定をwidthで行う
  let mobileFlag = null
  const isMobile = () => {
    const w = window.innerWidth
    mobileFlag = w > 700 ? false : true
    return mobileFlag
  }

  Vue.prototype.$isMobile = () => {
    return isMobile()
  }
}
export default VariablesPlugin;
