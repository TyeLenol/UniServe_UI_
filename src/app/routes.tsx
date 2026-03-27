import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import HomePage from "./components/HomePage";
import ServicesPage from "./components/ServicesPage";
import ServiceDetailPage from "./components/ServiceDetailPage";
import AuthPage from "./components/AuthPage";
import AnnouncementsPage from "./components/AnnouncementsPage";
import CartPage from "./components/CartPage";
import TypographyColorPage from "./components/TypographyColorPage";
import UserProfilePage from "./components/UserProfilePage";
import ChatPage from "./components/ChatPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import ProviderProfilePage from "./components/ProviderProfilePage";
import NotificationsPage from "./components/NotificationsPage";
import OrderTrackingPage from "./components/OrderTrackingPage";
import AdminPage from "./components/AdminPage";
import SupportInboxPage from "./components/SupportInboxPage";
import AdminRoute from "./components/AdminRoute";
import OnboardingPage from "./components/OnboardingPage";
import ProviderDashboard from "./components/ProviderDashboard";

// Wireframes
import HomePageWireframe from "./components/wireframes/HomePageWireframe";
import ServicesPageWireframe from "./components/wireframes/ServicesPageWireframe";
import ServiceDetailPageWireframe from "./components/wireframes/ServiceDetailPageWireframe";
import AuthPageWireframe from "./components/wireframes/AuthPageWireframe";
import AnnouncementsPageWireframe from "./components/wireframes/AnnouncementsPageWireframe";
import CartPageWireframe from "./components/wireframes/CartPageWireframe";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "service/:id", Component: ServiceDetailPage },
      { path: "auth", Component: AuthPage },
      { path: "onboarding", Component: OnboardingPage },
      { path: "provider-dashboard", Component: ProviderDashboard },
      { path: "announcements", Component: AnnouncementsPage },
      { path: "cart", Component: CartPage },
      { path: "design", Component: TypographyColorPage },
      { path: "profile", Component: UserProfilePage },
      { path: "chat/:id", Component: ChatPage },
      { path: "order-confirmation", Component: OrderConfirmationPage },
      { path: "provider/:id", Component: ProviderProfilePage },
      { path: "notifications", Component: NotificationsPage },
      { path: "order/:id", Component: OrderTrackingPage },
      {
        Component: AdminRoute,
        children: [
          { path: "admin", Component: AdminPage },
          { path: "support-inbox", Component: SupportInboxPage },
        ],
      },

      // Wireframe routes
      { path: "wireframes", Component: HomePageWireframe },
      { path: "wireframes/services", Component: ServicesPageWireframe },
      { path: "wireframes/service/:id", Component: ServiceDetailPageWireframe },
      { path: "wireframes/auth", Component: AuthPageWireframe },
      { path: "wireframes/announcements", Component: AnnouncementsPageWireframe },
      { path: "wireframes/cart", Component: CartPageWireframe },
    ],
  },
]);