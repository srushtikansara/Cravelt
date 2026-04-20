import React from "react";
 function Toast({ message }) {
  return (
    <div className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
      {message}
    </div>
  );
}

export default Toast;