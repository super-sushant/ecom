import React from 'react'
import { Collapse, Navbar, NavbarToggler,NavbarBrand,Nav,NavItem,Container, NavLink} from 'reactstrap'
import RegisterModel from './auth/registerModal'
import LoginModel from './auth/loginModal'
import Logout from './auth/Logout'
import {connect } from 'react-redux'
import PropTypes from 'prop-types'

class AppNavbar extends React.Component{
    state={isOpen:false}
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    toggle=()=>{
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    render(){
        const {isAuthenticated,user} =this.props.auth
        const authLinks =(
            <>
             <NavItem>
                 <span className = "navbar-text mr-3">
                     <strong >{user? `hello there ${user.name}`:''}</strong>
                 </span>
             </NavItem>
             <NavItem>
                 <NavLink href="/">Home</NavLink>
             </NavItem>
             <NavItem>
                 <NavLink href="/cart">Cart</NavLink>
             </NavItem>
             <NavItem className ="mr-2">
                 <NavLink href="/order">Order</NavLink>
             </NavItem>
             <NavItem>
                 <Logout/>
             </NavItem>
            </>
        )
        const guestLinks =(
            <>
            <NavItem>
                <RegisterModel/>
            </NavItem>
            <NavItem>
                <LoginModel/>
            </NavItem>
            </>
        )
        return (
            <div>
                <Navbar color='dark' dark expand ='sm' className='mb-5'>
                    <Container>
                        <NavbarBrand href="/">E Commerce Store</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className ="ml-auto" navbar>
                                {isAuthenticated?authLinks:guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
const mapStateToProps = state=>({
    auth:state.auth
})
export default connect(mapStateToProps,null)(AppNavbar)