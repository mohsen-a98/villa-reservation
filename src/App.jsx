import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import Spinner from "./ui/Spinner.jsx";
//pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Account = lazy(() => import("./pages/Account"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Booking = lazy(() => import("./pages/Booking.jsx"));
const Checking = lazy(() => import("./pages/Checking.jsx"));
const Villas = lazy(() => import("./pages/Villas"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
const Users = lazy(() => import("./pages/Users"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex h-dvh w-dvw items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to={"dashboard"} replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checking/:bookingId" element={<Checking />} />
              <Route path="villas" element={<Villas />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
        containerStyle={{ top: 20 }}
        gutter={24}
        position="top-center"
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
