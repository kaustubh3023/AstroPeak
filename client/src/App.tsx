import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages and Components
import Home from "./pages/Home";
import NotFound from "@/pages/not-found";
import Login from "./components/Login";
import DetailsScreen from "./components/DetailsScreen";
import Profile from "./components/Profile";
import AdminPanel from "./components/AdminPanel";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />               {/* ✅ Home is now default */}
      <Route path="/login" component={Login} />         {/* 🔁 Login moved to /login */}
      <Route path="/details" component={DetailsScreen} />
      <Route path="/profile" component={Profile} />
      <Route path="/admin" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
