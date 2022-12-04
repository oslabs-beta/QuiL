import React, { Suspense } from "react";
import { toast, ToastContainer } from "react-toastify";
function Loading() {
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='btn loading'>loading</div>
    </div>
  );
}

export default Loading;
