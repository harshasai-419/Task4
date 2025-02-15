import './loginIndex.css'
import { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import emp2 from '../../assets/emp2.mp4'
import SelectContext from '../../context/SelectContext';

class LoginPage extends Component {
    state = { username: '', password: '', goToHome: false, res: '' };

    getLoginDetails = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        if (username === '' || password === '') {
            this.setState({ res: "Invalid username or password", username: '', password: '' });
        } else {
            const url = "https://task4backend-c5l5.onrender.com/login";
            const userDetails = { username, password };
            const options = {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(userDetails),
            };
            const response = await fetch(url, options);

            if (response.status === 404) {
                this.setState({ res: "Try again", username: '', password: '' });
            } else if (response.ok === true) {
                const data = await response.json();
                const { jwtToken } = data;
                Cookies.set("jwt_token", jwtToken, { expires: 1 });

                this.setState({ goToHome: true });
            } else {
                this.setState({ res: "Username or password is incorrect", username: '', password: '' });
            }
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.goToHome && !prevState.goToHome) {
            this.context.updateUser(this.state.username);
        }
    }

    static contextType = SelectContext; // Access context

    changeUsername = (event) => {
        this.setState({ username: event.target.value });
    };

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    render() {
        const { username, password, goToHome, res } = this.state;

        if (goToHome || Cookies.get("jwt_token") !== undefined) {
            return <Navigate to="/" replace />;
        }

        return (
            <div className="login-bg-container">
                <video key={emp2} src={emp2} autoPlay loop muted className='video'/>
                <div className="content">
                    <h1 className="emp-head">Employee Check-in Page</h1>
                    <form className="login-card" onSubmit={this.getLoginDetails}>
                        <h1 className="login-form-head">Welcome back!</h1>
                        <div className="input-con">
                            <label className="label-ele" htmlFor="email">Email Address</label>
                            <input
                                placeholder="ENTER USERNAME"
                                id="email"
                                className="input-ele"
                                value={username}
                                onChange={this.changeUsername}
                            />
                        </div>
                        <div className="input-con">
                            <label className="label-ele" htmlFor="password">Password</label>
                            <input
                                id="password"
                                placeholder="ENTER PASSWORD"
                                type="password"
                                className="input-ele"
                                value={password}
                                onChange={this.changePassword}
                            />
                        </div>
                        <div className="log-reg">
                            <button className="login-button">Check-in</button>
                            <Link className="link-item" to="/register">Register</Link>
                        </div>
                        <p className="res-para">{res}</p>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;
