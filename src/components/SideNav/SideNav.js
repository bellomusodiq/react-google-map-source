import React from 'react';
import './SideNav.css';

const sideNav = props =>{
    let placesList = null;
    if(props.places){
        placesList = props.places.map((place, i) =>{
            return <div key={i} onClick={() => props.clicked(place)} className="list">{place}</div>
        })
    }
    if(props.placesResult.length > 0){
        placesList = props.placesResult.map((place, i) =>{
            return <div key={i} onClick={() => props.clicked(place)} className="list">{place}</div>
        })
    }if(props.val.trim() !== '' && props.placesResult.length === 0){
        placesList = <div className="no">No Search found</div>
    }
    return(
        <div className="SideNav" style={{transform: props.show?'translateX(0)':'translateX(-270px)'}} >
            <div className="form">
                <input type="text" value={props.val} className="filterInput" placeholder="Filter"
                 onChange={(e) => props.filterInput(e)} />
                <input type="button" value="RESET" onClick={props.reset} className="filterButton" />
                <br/><br/>
                {placesList}
            </div>
            <div className="button" onClick={props.toggle}>
                <div className={props.show?"first":null}></div>
                <div className={props.show?"second":null}></div>
                <div className={props.show?"third":null}></div>
            </div>
        </div>
    )
}

export default sideNav;