import { Outlet } from "react-router-dom";
import React from "react"


function RootLayout() {
  // const navigation = useNavigation();
  
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
