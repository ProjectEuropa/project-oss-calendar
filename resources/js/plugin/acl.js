const AclPlugin = {}
AclPlugin.install = function (Vue) {
  const ADMIN = 1
  const USER = 2
  const acl = {
    adminMenu: {
      show: user => {
        if (!user) return false
        if (user.role_id === USER) return false
        if (user.role_id === ADMIN) return true
        return false
      }
    }
  }
  const can = (user, verb, subject, ...args) => {
    return acl[subject][verb](user, ...args)
  }
  Vue.prototype.$can = function(verb, subject, ...args) {
    const user = this.$auth.user
    return can(user, verb, subject, ...args)
  }
}
export default AclPlugin;
