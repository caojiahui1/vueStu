export default{
	increment (state) {
      state.title++
    },
    titlechange (state,change) {
      state.title=change
    }
}