import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import NFTMint from "@/pages/nft-mint";
import Legal from "@/pages/legal";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/ui/navigation";
import ScrollToTop from "@/components/ui/scroll-to-top";

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/nft-mint" component={NFTMint} />
        <Route path="/legal" component={Legal} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark min-h-screen bg-gray-900 text-white">
          <Navigation />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Router />
          </motion.main>
          <ScrollToTop />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
