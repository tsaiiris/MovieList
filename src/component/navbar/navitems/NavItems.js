import React, {Fragment} from 'react'
import { Link } from 'react-router-dom'

import './NavItems.scss'

const NavItems = (props) => {

    return (
        <Fragment>
            <div><Link to='/homepage' onClick={props.clicked}>HomePage</Link></div>
            <div><Link to='/movielist/1' onClick={props.clicked}>MovieList</Link></div>
            <div><Link to='/movielistofliked' onClick={props.clicked}>MovieOfLikedList</Link></div>
            <div><Link to='/movielistofblocked' onClick={props.clicked}>MovieOfBlockedList</Link></div>
        </Fragment>

    )
}

export default NavItems