import React, { Component } from "react";
import PropTypes from "prop-types";
//import { classnames } from "classnames";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import styles from "./Signup.module.css";
import { connect } from "react-redux";
import { signupUser } from "../../../redux/actions/authActions";
import InputField from "../../common/inputFieldGroup/InputTextField";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.signupUser(newUser, this.props.history);
  }

  render() {
    // const { errors } = this.state;
    return (
      <main className={styles.main}>
        <div className={styles.signup}>
          <h2 className={styles.h2}>New User SignUp</h2>
          <form onSubmit={this.onSubmit}>
            <InputField
              name="firstname"
              placeholder="Firstname"
              value={this.state.firstname}
              onChange={this.onChange}
              classname={styles.input}
            />
            <InputField
              name="firstname"
              placeholder="Lastname"
              value={this.state.lastname}
              onChange={this.onChange}
              classname={styles.input}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChange}
              classname={styles.input}
            />
            <InputField
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={this.state.phone}
              onChange={this.onChange}
              classname={styles.input}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              classname={styles.input}
            />
            <InputField
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={this.state.password2}
              onChange={this.onChange}
              classname={styles.input}
            />
            <br />
            <button className={styles.btn} name="btn">
              Submit
            </button>
            <Link to="/login" className={(styles.p, styles.link)}>
              Already a member,sign in
            </Link>
          </form>
        </div>
      </main>
    );
  }
}
SignUp.propTypes = {
  signupUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProp = state => ({
  auth: state.auth,
  err: state.errors
});

export default connect(mapStateToProp, { signupUser })(withRouter(SignUp));