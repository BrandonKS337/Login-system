import { extendObservable } from "mobx";

/**
 * UserStore
 */

class UserStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      isLoggedIn: false, //boolean or slogan to determine if user is logged in
      username: "",
    });
  }
}
export default new UserStore(); 

//creates a new instance of the UserStore class which contains the extendObservable which contains the data that we are using with mobx
