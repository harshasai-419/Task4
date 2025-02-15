import './leftconIndex.css'
import {Component} from 'react'
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";    
import {Link} from 'react-router-dom'
import SelectContext from '../../context/SelectContext';


class LeftCon extends Component{

    render(){
        let {select}=this.props
        return(
            <SelectContext.Consumer>
            {value=>{
                const {selectedTask,toggleTask}=value
                return(
                    <div className='dash-left-con'>
                        <div>
                        {select==='dashboard' || selectedTask==='dashboard'?
                            (<Link className='select-dash-left-icon' to="/">
                                <Link className='select-left-link-item' to="/"> <MdDashboard /></Link>
                                <Link className='select-left-link-item' to="/">Dashboard</Link><br/>
                            </Link>
                            ):(<Link className='dash-left-icon' to="/" onClick={()=>toggleTask('dashboard')}>
                                <Link className='left-link-item' to="/">
                                    <span><MdDashboard /></span>
                                    <span>Dashboard</span>
                                </Link>
                            </Link>)}

                            {select==='tasks' || selectedTask==='tasks'?
                            (<Link className='select-dash-left-icon' to='/projects'>
                                <Link className='select-left-link-item' to='/projects'> <FaTasks /> </Link>
                                <Link className='select-left-link-item' to='/projects'>Projects</Link><br/>
                            </Link>):
                            (<Link className='dash-left-icon' onClick={()=>toggleTask('tasks')} to='/projects'>
                                <Link className='left-link-item' to='/projects'> <FaTasks /> </Link>
                                <Link className='left-link-item' to='/projects'>Projects</Link><br/>
                            </Link>)}

                            {select==='completed' || selectedTask==='completed'?(
                            <Link className='select-dash-left-icon' to="/checkin">
                                <Link className='select-left-link-item' to="/checkin"> <SiTicktick /></Link>
                                <Link className='select-left-link-item' to="/checkin">checkin Details</Link><br/>
                            </Link>
                            ):(<Link className='dash-left-icon' to="/checkin" onClick={()=>toggleTask('completed')}>
                                <Link className='left-link-item' to="/checkin"> <SiTicktick /></Link>
                                <Link className='left-link-item' to="/checkin">checkin Details</Link><br/>
                            </Link>)}

                            {selectedTask==='inProgress' || select==='inProgress'?(
                            <Link className='select-dash-left-icon' to="/profile">
                                <Link className='select-left-link-item' to="/profile" > <GrInProgress /></Link>
                                <Link className='select-left-link-item' to="/profile">Profile</Link><br/>
                            </Link>
                            ):(<Link className='dash-left-icon' onClick={()=>toggleTask('inProgress')} to="/profile">
                                <Link className='left-link-item' to="/profile"> <GrInProgress /></Link>
                                <Link className='left-link-item' to="/profile">Profile</Link><br/>
                            </Link>)}

                            {selectedTask==='checkout' || select==='checkout'?(
                            <Link className='select-dash-left-icon' to="/logout">
                                <Link className='select-left-link-item' to="/logout" > <IoLogOutSharp /></Link>
                                <Link className='select-left-link-item' to="/logout">Check out</Link><br/>
                            </Link>
                            ):(<Link className='dash-left-icon' onClick={()=>toggleTask('inProgress')} to="/logout">
                                <Link className='left-link-item' to="/logout"><IoLogOutSharp /></Link>
                                <Link className='left-link-item' to="/logout">Check out</Link><br/>
                            </Link>)}
                        
                        </div>
                        {selectedTask==='settings' || select==='settings' ?(
                            <Link className='select-dash-left-icon' to="/settings">
                                <Link className='select-left-link-item' to="/settings"><IoMdSettings /></Link>
                                <Link className='select-left-link-item' to="/settings">Settings</Link>
                            </Link>
                        ):(<Link className='dash-left-icon' to="/settings" onClick={()=>toggleTask('settings')}>
                                <Link className='left-link-item' to="/settings"><IoMdSettings /></Link>
                            <Link className='left-link-item' to="/settings">Settings</Link>
                        </Link>)}
                        
                    </div>
                )
            }}
            </SelectContext.Consumer>
        )
    }
}

export default LeftCon