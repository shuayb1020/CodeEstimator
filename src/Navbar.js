// import estimate2 from './estimate2.png'
// import estimte from './estimte.png'
const Navbar = () => {
    return (
        <nav className="navbar">
            {/* <img src={estimate2} alt="logo" height={40} width={40} /> */}
            {/* <img src={estimte} alt="logo" height={190} width={170} /> */}
            <h1> CodeEstimator</h1>
            <div className={`navbar-links`}>
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </div>

        </nav>
    );
}

export default Navbar;