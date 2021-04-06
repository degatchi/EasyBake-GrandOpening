import "./Footer.css";

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Contact</h4>
            <ui className="list-unstyled">
              <li>EasyBakeSwap@gmail.com</li>
            </ui>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Socials</h4>
            <ui className="list-unstyled">
              <a href="https://twitter.com/EasyBakeSwap" target="_blank">Twitter</a>
              <br/>
              <a href="https://t.me/EasyBakeSwap" target="_blank">Telegram</a>
              <br/>
              <a href="https://github.com/EasybakeSwap" target="_blank">Github</a>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Contract Addresses</h4>
            <ui className="list-unstyled">
              <a href="https://ropsten.etherscan.io/address/0xce2ac9a13c4ec3bc2979e34d91ba088afbf2caf4" target="_blank">OvenToken.sol</a>
              <br/>
              <a href="https://ropsten.etherscan.io/address/0x08790cd613eedc74d1bf01acab4a8dcbbfe44e92" target="_blank">SugarBar.sol</a>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} <a href="https://easybake.finance/" target="_blank">EasyBakeSwap</a> | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
