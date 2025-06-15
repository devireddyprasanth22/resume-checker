import { Routes, Route, useLocation } from 'react-router-dom';
import UploadPage from './uploadPage';
import AnalyzedFeedback from './analyzedFeedback';
export default function AnimatedRoutes() {
    const location = useLocation();
    return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<UploadPage />} />
      <Route path="/analysed" element={<AnalyzedFeedback />} />
    </Routes>
    )

}
