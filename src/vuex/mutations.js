export default{
	increment (state) {
      state.title++
    },
    titlechange (state,change) {
      state.title=change
    },
    myLoginchange (state,flag) {
      state.myLogin=flag
    },
    isLoginchange (state,a) {
      state.isLogin=a
    },
    namechange (state,b) {
      state.myName=b
    }
}