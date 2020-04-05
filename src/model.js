import { createStore, action } from "easy-peasy";

const userModel = {
	user: null,
	update: action((state, paylod) => {
		state.user = paylod;
	}),
};

let model = { userModel };
const store = createStore(model);
export default store;
