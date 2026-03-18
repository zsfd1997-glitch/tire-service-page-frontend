import { useEffect } from "react";
import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Vehicle } from "./pages/Vehicle";
import { TireShop } from "./pages/TireShop";
import { ServiceBooking } from "./pages/ServiceBooking";
import { TireRecord } from "./pages/TireRecord";
import { FAQ } from "./pages/FAQ";
import { TireDetail } from "./pages/TireDetail";
import { StoreLocation } from "./pages/StoreLocation";
import { AiInspection } from "./pages/AiInspection";
import { TireSpecSelector } from "./pages/TireSpecSelector";

function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/vehicle/:id",
        Component: Vehicle,
      },
      {
        path: "/ai-inspection/:id",
        Component: AiInspection,
      },
      {
        path: "/tire-spec/:id",
        Component: TireSpecSelector,
      },
      {
        path: "/products",
        Component: TireShop,
      },
      {
        path: "/products/:id",
        Component: TireDetail,
      },
      {
        path: "/tire-shop",
        element: <Navigate to="/products" replace />,
      },
      {
        path: "/tire/:id",
        element: <Navigate to="/products" replace />,
      },
      {
        path: "/appointment",
        Component: ServiceBooking,
      },
      {
        path: "/service-booking",
        element: <Navigate to="/appointment" replace />,
      },
      {
        path: "/records",
        Component: TireRecord,
      },
      {
        path: "/tire-record",
        element: <Navigate to="/records" replace />,
      },
      {
        path: "/knowledge",
        Component: FAQ,
      },
      {
        path: "/faq",
        element: <Navigate to="/knowledge" replace />,
      },
      {
        path: "/store-location",
        Component: StoreLocation,
      },
      {
        path: "/tire-health",
        element: <Navigate to="/home" replace />,
      },
    ],
  },
]);
