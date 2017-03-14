import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../store'
import * as actions from '../actions'

class Contact extends Component {

    constructor(props) {
		super(props);
    }

    componentWillMount() {
        let storeState = store.getState();
        let data = storeState.products;
        let title = storeState.title;
        let contact = storeState.contact;
        let basket = storeState.basket;
        let validation = storeState.validation.contact;
        this.state = {
            products : data,
            title : title,
            contact : contact,
            basket : basket,
            unsubscribe: store.subscribe(this.onStoreUpdated.bind(this)),
            validation: validation
        };
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    onStoreUpdated() {
		
		let storeState = store.getState();
		let contact = storeState.contact;
		
		this.setState({
			contact : contact
		});

	}

    handleChange(event) {
        store.dispatch(actions.updateForm(event));
    }

    areAllValid(event) {
       console.log(this.state.validation);
    }

    render() {
        return <div>
            <p className="title">{this.state.title}</p>
            <ul id="breadcrumbs"><li><Link to='/'>Basket</Link></li>  >  <li className="active">Contact Details</li>  >  <li>Payment</li></ul>
            <br /> 
                 <form id="contact">
                    <div className="form-half left">
                        Forename: <input type="text" data-contacttype="fname" value={this.state.contact.fname} onChange={this.handleChange} />
                        Surname: <input type="text" data-contacttype="sname" value={this.state.contact.sname} onChange={this.handleChange} />
                        Email: <input type="text" data-contacttype="email" value={this.state.contact.email} onChange={this.handleChange} />
                        Phone: <input type="text" data-contacttype="phone" value={this.state.contact.phone} onChange={this.handleChange} />
                        Address line 1: <input type="text" data-contacttype="addr1" value={this.state.contact.addr1} onChange={this.handleChange} />
                        Address line 2: <input type="text" data-contacttype="addr2" value={this.state.contact.addr2} onChange={this.handleChange} />
                        Postcode: <input type="text" data-contacttype="pcode" value={this.state.contact.pcode} onChange={this.handleChange} />
                        City: <input type="text" data-contacttype="city" value={this.state.contact.city} onChange={this.handleChange} />
                    </div>
                    <div id="delDetails" className="form-half right">
                        <p>Your order will be delivered to: </p>
                        <br />
                        <p>{this.state.contact.fname} {this.state.contact.sname}</p>
                        <p>{this.state.contact.addr1}</p>
                        <p>{this.state.contact.addr2}</p>
                        <p>{this.state.contact.pcode}</p>
                        <p>{this.state.contact.city}</p>
                        <br />
                        <p>If we need to get in touch, we'll contact you at: {this.state.contact.phone} & {this.state.contact.email}</p>
                    </div>
                </form>
            <br />
            <Link className="proceed back" to='/'> Go back </Link>
            <Link className="proceed" to='payment'> Continue </Link>
        </div>
    }
}

export default Contact