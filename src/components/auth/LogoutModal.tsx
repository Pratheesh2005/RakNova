import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function LogoutModal({ isOpen, onClose, onConfirm, loading }: LogoutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4"
          >
            <div className="w-12 h-12 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center">Confirm Logout</h3>
            <p className="mt-2 text-gray-600 text-center">
              Are you sure you want to log out? You'll need to sign in again.
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" size="md" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" size="md" onClick={onConfirm} loading={loading} className="flex-1">
                Logout
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
