import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ReactNode } from "react";

interface ErrorStateProps {
  icon?: ReactNode;
  title: string;
  message: string;
  buttonLabel: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

export function ErrorState({
  icon,
  title,
  message,
  buttonLabel,
  buttonHref,
  onButtonClick,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center"
    >
      {icon || (
        <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )}
      <h2 className="mt-6 text-2xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-gray-600">{message}</p>
      <div className="mt-8">
        {buttonHref ? (
          <Button variant="primary" size="lg" href={buttonHref}>
            {buttonLabel}
          </Button>
        ) : (
          <Button variant="primary" size="lg" onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
