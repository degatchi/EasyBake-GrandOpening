import PropTypes from 'prop-types'

const Navbar = ({ title }) => {    
    return (
        <nav className='navbar bg-primary'>
            <h1>
                {title}
            </h1>
        </nav>
    )
}

export default Navbar