import React from "react";
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Signin from "./signin";
import Signup from "./signup";
export default function Sign() {
  return(
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-1 px-0 dark:bg-slate-800">
        <Routes>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to={"signin"} replace />} />
        </Routes>
        <div className="bg-gray-100 hidden md:flex justify-center items-center dark:bg-slate-400">
          <div className="h-60 w-60 rounded-full bg-purple-700 grid grid-cols-1 grid-rows-2">
            <div></div>
            <div className="relative">
              <div className="backdrop-blur-md absolute top-1/2 left-1/2 w-80 h-40 -translate-x-1/2 -translate-y-1/3"></div>
            </div>
          </div>
        </div>
      </div>
  )
}
