import React from "react"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">&copy; {new Date().getFullYear()} Your Company</p>
        <p className="footer-text">Contact: contact@yourcompany.com</p>
      </div>
    </footer>
  )
}
export default Footer
