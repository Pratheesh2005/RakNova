import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface UploadSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
}

export function UploadSuccessDialog({ isOpen, onClose, fileName }: UploadSuccessDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
          >
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-5">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Resume Uploaded Successfully!</h3>
            <p className="text-sm text-gray-500 mt-2">
              <span className="font-medium text-gray-700">{fileName}</span> is now ready for AI analysis.
            </p>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" size="md" className="flex-1" onClick={onClose}>
                Continue
              </Button>
              <Button variant="primary" size="md" className="flex-1" onClick={onClose}>
                View Analysis
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
