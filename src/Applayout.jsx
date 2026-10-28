import Header from "./component/Header";
import Footer from "./component/Footer";
import { Outlet } from "react-router";
import { CartProvider } from "./context/CartContext";

const AppLayout = () => {
  return (
    <CartProvider>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default AppLayout;