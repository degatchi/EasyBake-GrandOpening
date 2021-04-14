import './Footer.css';

const Footer = () => {
  return (
    <div className='main-footer'>
      <div className='container'>
        <div className='row'>
          {/* Column1 */}
          <div className='col'>
            <h4>Contact</h4>
            <ui className='list-unstyled'>
              <li>EasyBakeSwap@gmail.com</li>
            </ui>
          </div>
          {/* Column2 */}
          <div className='col'>
            <h4>Socials</h4>
            <ui className='list-unstyled'>
              <a
                href='https://twitter.com/EasyBakeFinance'
                target='_blank'
                rel='noreferrer'
              >
                <i class='fab fa-twitter-square' /> Twitter
              </a>
              <br />
              <a
                href='https://t.me/EasyBakeSwap'
                target='_blank'
                rel='noreferrer'
              >
                <i class='fab fa-telegram' /> Telegram
              </a>
              <br />
              <a
                href='https://github.com/EasybakeSwap'
                target='_blank'
                rel='noreferrer'
              >
                <i class='fab fa-github' /> Github
              </a>
            </ui>
          </div>
          {/* Column3 */}
          <div className='col'>
            <h4>Contract Addresses</h4>
            <ui className='list-unstyled'>
              <a
                href='https://ropsten.etherscan.io/address/0x1acb479bb9d1f73009f85ef5f495e942bb57f15a#code'
                target='_blank'
                rel='noreferrer'
              >
                OvenToken.sol
              </a>
              <br />
              <a
                href='https://ropsten.etherscan.io/address/0x11058ea62665ac8ab5cae5a2abc97e5451ace604#code'
                target='_blank'
                rel='noreferrer'
              >
                SugarBar.sol
              </a>
              <br />
              <a
                href='https://ropsten.etherscan.io/address/0xc6deeacf599d97761cd03ce0aac45964daebc234#code'
                target='_blank'
                rel='noreferrer'
              >
                MasterChef.sol
              </a>
            </ui>
          </div>
        </div>
        <hr />
        <div className='row'>
          <p className='col-sm'>
            &copy;{new Date().getFullYear()}{' '}
            <a
              href='https://easybake.finance/'
              target='_blank'
              rel='noreferrer'
            >
              EasyBakeSwap
            </a>{' '}
            | All rights reserved | Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
