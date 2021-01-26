import React from 'react'
import Card from '@material-ui/core/Card';
import EditableArea from '../../core/components/EditableArea'


function ShopSnippet() {

    // add a button that is only visible in admin mode, the button allows you to add and remove banner items on the page
    var offerNumber = 1

    const options = {
        items: 3,
        nav: true,
        rewind: true,
        autoplay: false,
        loop: true
    };

    const events = {
        onDragged: function (event) {

        },
        onChanged: function (event) {

        }
    };

    return (
        <div className="">

        </div>
    )


}

export default ShopSnippet
