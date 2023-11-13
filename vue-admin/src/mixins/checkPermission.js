import store from '@/store'

// 相同的配置项
export default {
  methods: {
    // point 某个按钮对应的权限标识
    checkPermission(point) {
      // 判断按钮的权限标识否在 该用户的所有按钮权限标识数组中
      const allPoints = store.state.user.userInfo.roles.points
      console.log(allPoints)
      return allPoints.includes(point)
    }
  }
}
