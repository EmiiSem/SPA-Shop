function Footer() {
    return (
        <footer className="page-footer indigo accent-1">
          <div className="footer-copyright">
            <div className="container">
            © {new Date().getFullYear()} Game Shop Items
            </div>
          </div>
        </footer>
    )
}

export {Footer}