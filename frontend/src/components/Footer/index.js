import './Footer.css';

const Footer = () => {
    return (
        <div id='footer-container'>
            <p>© 2022 Fairbnb, Inc.</p>
            <div id='footer-right-info'>
                <div id='footer-language'>
                    <span className='footer-language-tt'>Language</span>
                    <span id='language-triangle'></span>
                    <svg width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 2.04932C13 2.04932 16 5.99994 16 11.9999C16 17.9999 13 21.9506 13 21.9506" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 21.9506C11 21.9506 8 17.9999 8 11.9999C8 5.99994 11 2.04932 11 2.04932" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.62964 15.5H21.3704" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.62964 8.5H21.3704" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className='footer-right-info-text'>English (US)</p>
                </div>
                <div id='footer-currency'>
                    <span className='footer-currency-tt'>Currency</span>
                    <span id='currency-triangle'></span>
                    <p className='footer-right-info-text'>$ USD</p>
                </div>
                <div id='footer-about'>
                    <p className='footer-right-info-text'>About</p>
                    <svg version="1.1" id="footer-arrow" xmlns="http://www.w3.org/2000/svg"
	                    viewBox="0 0 330 330">
                        <path id="XMLID_93_" d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
	                    l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
	                    C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Footer;
