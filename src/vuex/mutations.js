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
    isLoginchange (state,flag) {
      state.isLogin=flag
    },
    namechange (state,flag) {
      state.myName=flag
    }
}