import logo from "../assets/Horizontal_Combination_Mark.svg";

function Footer() {
    return (
        <footer className="footer">
            <div className="logo__footer">
                <img className="logo-image__footer" src={logo} alt="Horizontal Story Safe Logo"/>
            </div>
            <nav className="footer-menu">
                <ul className="menu-list__footer">
                    <li>
                        <h2>
                            <a href="/">
                                <span>Home</span>
                            </a>

                        </h2>
                    </li>
                    <li>
                        <h2>
                            <a href="/about">
                                <span>About</span>
                            </a>

                        </h2>
                    </li>
                    <li>
                        <h2>
                            <a href="/random">
                                <span>Random</span>
                            </a>

                        </h2>
                    </li>
                    <li>
                        <h2>
                            <a href="/contact">
                                <span>Contact</span>
                            </a>

                        </h2>
                    </li>
                    <li>
                        <h2>
                            <a href="/source_code">
                                <span>Source Code</span>
                            </a>

                        </h2>
                    </li>
                    <li>
                        <h2>
                            <a href="/documentation">
                                <span>Documentation</span>
                            </a>

                        </h2>
                    </li>
                    <li>
                        <h2>
                            <a href="/license">
                                <span>Licenses</span>
                            </a>

                        </h2>
                    </li>
                </ul>
            </nav>

            <div className="foot">
                <p>Community content is available under CC-BY-SA unless otherwise noted</p>
            </div>
        </footer>
    );
}

export default Footer;