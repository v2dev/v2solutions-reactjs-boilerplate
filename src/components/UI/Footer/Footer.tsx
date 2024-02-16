import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">&copy; {new Date().getFullYear()}  V2Solutions. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
export default Footer
