import React, { Component } from 'react';
import Spinner from './Spinner/Spinner';


const foursquare = require('react-foursquare')({
  clientID: 'EJG0PEZEDJNIX2FQC2C3BIP2DTO2LSG25TBFWJMYN5MJPRMG',
  clientSecret: 'QIDAXRU3E4FWCV5MU1UFGTTBK2IRFO5CJ0DCK35XKGHGGMLF'  
});


export default class FoursquareDemo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            error: false,
        };
    }
    
    componentDidMount() {    
        if(this.props.ll && this.props.query){
            var params = {
                "ll": this.props.ll,
                "query": this.props.query
            };
            foursquare.venues.getVenues(params)
            .then(res=> {
                this.setState({ items: res.response.venues[0] });
            }).catch(err =>{
                this.setState({error: true})
            })
        }
  }
  componentWillUnmount = () => {
    this.setState({error: false})
  }
  

  render() {
    let locationInfo = <Spinner />
    if(this.state.items){
        let location = this.state.items.location
        locationInfo = (
            <div>
                <div>{this.state.items.name}</div><br/>
                <div>Address: {location.address +', '+ 
                location.city + ', ' + location.state+ ', '
                +location.country}</div>
            </div>
        )
    }
    if(this.state.error){
        locationInfo = 'Network Error'
    }
    return locationInfo
  }
}
