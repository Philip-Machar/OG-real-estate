// File: src/App.tsx
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import ScrollToTop from "./components/base/ScrollToTop";
import FloatingWhatsApp from "./components/feature/FloatingWhatsApp";

function App() {
  return (
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter basename={__BASE_PATH__}>
          <ScrollToTop />
          <AppRoutes />
          <FloatingWhatsApp />
        </BrowserRouter>
      </I18nextProvider>
    </HelmetProvider>
  );
}

export default App;