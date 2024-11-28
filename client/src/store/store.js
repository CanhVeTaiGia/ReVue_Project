import { createStore } from "vuex";
import { userModule } from "./modules/user.module";
import { categoryModule } from "./modules/category.module";
import { productModule } from "./modules/product.module";
import { orderModule } from "./modules/order.module";
import { orderDetailModule } from "./modules/orderDetail.module";

const store = createStore({
  modules: {
    userModule,
    categoryModule,
    productModule,
    orderModule,
    orderDetailModule
  },
});
export default store;
