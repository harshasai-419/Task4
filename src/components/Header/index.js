import {Link} from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import './headIndex.css'
import { SiTask } from "react-icons/si";
import SelectContext from '../../context/SelectContext';

const DashboardHeader=()=>{
    return(
        <SelectContext.Consumer>
            {value=>{
                const {toggleTask}=value
                return(
                    <nav className='nav-con'>
                        <div className='nav-left'>
                            
                            <p className='nav-left-para-icon'><SiTask  className="dash-icon"/></p>
                            <p className='nav-left-para'>Employee Det</p>
                        </div>
                        <div className='dash-input-con'>
                            <FaSearch className='search-icon'/>
                            <input type="search" placeholder="Search" class="dash-input"/>
                        </div>
                        <div className='nav-right'>
                            <Link className='link-item' to="/" onClick={()=>toggleTask('dashboard')}>Home</Link>
                            <Link className='link-item' to="/about">About</Link>
                            <Link className='link-item' to="/logout">Checkout</Link>
                        </div>
                    </nav>
                )
            }}
        </SelectContext.Consumer>
    )
}

export default DashboardHeader 