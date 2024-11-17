import { createStore } from "vuex";
import { userModule } from "./modules/user.module";
import {categoryModule} from "./modules/category.module";

const store = createStore({
    modules: {
        userModule,
        categoryModule
    }
})
export default store;