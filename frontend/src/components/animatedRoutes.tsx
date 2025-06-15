import { Routes, Route, useLocation } from 'react-router-dom';
import UploadPage from './uploadPage';
import AnalyzedFeedback from './analyzedFeedback';
import { AnimatePresence } from 'framer-motion';
export default function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait"> 
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<UploadPage />} />
      <Route path="/analysed" element={<AnalyzedFeedback />} />
    </Routes>
    </AnimatePresence>
    )

}
