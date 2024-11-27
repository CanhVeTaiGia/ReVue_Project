import { createStore } from "vuex";
import { userModule } from "./modules/user.module";
import { categoryModule } from "./modules/category.module";
import { productModule } from "./modules/product.module";

const store = createStore({
  modules: {
    userModule,
    categoryModule,
    productModule,
  },
});
export default store;
