import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import store from '../store'
import * as actions from '../actions'

class Complete extends Component {

    constructor(props) {
		super(props);
    }

    componentWillMount() {
        let storeState = store.getState();
        let data = storeState.products;
        let title = storeState.title;
        let contact = storeState.contact;
        let basket = storeState.basket;
        let payment = storeState.payment;
        let loading = true;
        this.state = {
            products : data,
            title : title,
            contact : contact,
            basket : basket,
            payment : payment,
            loading : loading,
            unsubscribe: store.subscribe(this.onStoreUpdated.bind(this))
        };

    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    componentDidMount() {
        var self = this;
        setTimeout(() => {
        self.setState({loading: false}); }, 2000);
        setTimeout(() => {
            store.dispatch(actions.clearBasket());
        }, 3000);
    }

    renderItemMb(item) {
		return <div key={item.sku}>
			<p>{item.name}</p>
			<p>£{item.price.toFixed(2)}</p>
			<p>Quantity: {item.qty}</p>
		</div>
	}


    onStoreUpdated() {
		
		let storeState = store.getState();

	}

    render() {
        if (this.state.loading) {
        return ( 
            <div className='my-nice-tab-container'>
            <div className='loading-state cp-spinner cp-round'></div>
            </div>)
        } else {
        return <div>
            <div id="complete">
                <p className="title">{this.state.title}</p>
                <div className="half">
                    <p>Thanks for your order!</p>
                    <p>Your order number is:  1128586</p>
                    <br />
                    {this.state.basket.items.map(items => this.renderItemMb(items))}
                </div>
                <div className="half">
                    <p>{this.state.contact.fname} {this.state.contact.sname}</p>
                    <p>{this.state.contact.addr1}</p>
                    <p>{this.state.contact.addr2}</p>
                    <p>{this.state.contact.pcode}</p>
                    <p>{this.state.contact.city}</p>
                    <br />
                    <p>Card number: {this.state.payment.card}</p>
                    <p>Name on card: {this.state.payment.name}</p>
                    <p>Expiration data: {this.state.payment.data}</p>
                    <p>CCV: {this.state.payment.ccv}</p>
                    <br />
                    <p>Your delivery will be with you at some point</p>
                </div>
            </div>

            <Link className="proceed back" to='/'> Return </Link>
        </div>
    }
    }
}

export default Complete