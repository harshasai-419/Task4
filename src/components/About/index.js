import './index.css'
import {Component} from 'react'
import Header from '../Header'

class About extends Component{
    render(){
        return(
            <div>
                <Header/>
                <div className='total-about-con'>
                    <img src="https://www.kit19.com/kit19new/style/img/ett2.png" className="about-img"/>
                    <h3>An Employee Work Tracker is a web application designed to monitor and manage employee attendance,<br/> work hours, and performance. It ensures accurate tracking of work schedules, productivity, and task summaries.</h3>
                    <h2>Key Features:</h2>
                    <h3>Employee Sign-in & Sign-out:</h3>
                    <p>Employees can log in and mark their attendance using a secure authentication system.
                    Time-stamped entries are recorded in the database.
                    </p>
                    <h3>Profile Management:</h3>
                    <p>Displays employee details such as name, designation, and department.
                    Provides an overview of work history and attendance.</p>
                    <h3>Attendance Tracking:</h3>
                    <p>Shows the total number of days attended vs. total working days.
                    Tracks late entries, early sign-outs, and absences.</p>
                    <h3>Task & Work Summary:</h3>
                    <p>Employees can log daily tasks and submit progress reports.
                    Admins can review and provide feedback.</p>
                    <h3>Database & Security:</h3>
                    <p>Secure storage of employee records and work logs.
                    Role-based access control for employees and administrators.
                    </p>
                    <h3>Dashboard & Reports:</h3>
                    <p>Admins can generate attendance and performance reports.
                    Employees can view personal attendance insights.</p>
                    
                </div>
            </div>
        )
    }
}
export default About