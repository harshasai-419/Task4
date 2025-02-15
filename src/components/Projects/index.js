import './projectIndex.css';
import { Component } from 'react';
import LeftCon from '../LeftCon';
import Header from '../Header';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BounceLoader } from 'react-spinners';

class Projects extends Component {
    state = { data: [{task:'First'}], isLoading: true, error: false };

    componentDidMount() {
        this.getProjects();
    }

    getProjects = async () => {
        try {
            const url = "https://task4backend-c5l5.onrender.com/tasks";
            const response = await fetch(url);
            console.log(response)
            if (response.ok===true) {
                const data = await response.json();
                this.setState({ data, isLoading: false });
            }
            
        } catch (error) {
            console.error("Error fetching data:", error);
            this.setState({ isLoading: false, error: true });
        }
    };

    render() {
        if (!Cookies.get("jwt_token")) {
            return <Navigate to="/login" replace />;
        }

        const { select } = this.props;
        const { data, isLoading} = this.state;

        return (
            <div className='dash-total-con'> 
                <Header/> 
                <div className='dash-containers'>
                    <LeftCon select={select}/> 
                    {isLoading ? (
                        <div className='loader-con'>
                            <BounceLoader color="#36d7b7" loading={true} size={40} />
                        </div>
                    ) : (
                        <div className='total-projects-right-con'>
                            <h1 className='project-head'>Projects</h1>
                            {data.length === 0 ? (
                                <p>No projects available.</p>
                            ) : (
                                <ul className='all-projects'>
                                    {data.map((project) => (
                                        <li key={project.id} className='project-card'>
                                            <h2>{project.task}</h2>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Projects;
