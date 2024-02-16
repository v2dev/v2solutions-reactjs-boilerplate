import { Outlet } from "react-router-dom";
import React from "react"

const RootLayout: React.FC = () => {
  // const navigation = useNavigation();  
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default RootLayout;
