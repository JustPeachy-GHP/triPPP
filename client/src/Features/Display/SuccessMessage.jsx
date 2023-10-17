import "../Journal/Journal.css";
import { useState, useEffect } from "react";

export default function SuccessMessage() {
  const [showSuccess, setShowSuccess] = useState(true);
  const [progress, setProgress] = useState(0);

  const closeSuccessMessage = () => {
    setShowSuccess(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeSuccessMessage();
    }, 5000);

    const updateProgress = () => {
      const interval = 100; // 100 milliseconds
      const steps = 50; // 5000ms / 100ms = 50 steps
      const increment = 100 / steps;
      let currentProgress = 0;

      const progressInterval = setInterval(() => {
        currentProgress += increment;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(progressInterval);
        }
      }, interval);
    };

    updateProgress();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return showSuccess ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="max-w-md rounded-md w-64 bg-green-100 text-green-700 overflow-hidden shadow-md relative">
        <div className="flex flex-col gap-4 p-1">
          <div className="flex items-center justify-end"></div>
          <div className="space-y-1 text-center">
            <p className="font-bold capitalize">Success Message</p>
            <p className="text-sm">
              Your information was submitted successfully!
            </p>
          </div>
          <div className="bg-gray-300 h-2">
            <div
              className="bg-green-300 h-2"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-center"></div>
        </div>
      </div>
    </div>
  ) : null;
}
