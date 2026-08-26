import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Doacao from "./pages/doacao/Doacao";
import Cadastro from "./pages/cadastro/Cadastro";
import Voluntariado from "./pages/voluntariado/Voluntariado";
import "./globalStyles.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import NotFound from "./pages/notFound/NotFound";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

export default function App() {
  return (
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doacoes" element={<Doacao />} />
          <Route path="/doacao" element={<Navigate to="/doacoes" replace />} />
          <Route path="/cadastro" element={<Cadastro />} /> 
          <Route path="/voluntariado" element={<Voluntariado />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}
