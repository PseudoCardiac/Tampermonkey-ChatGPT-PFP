// ==UserScript==
// @name         ChatGPT PFP
// @namespace    https://github.com/PseudoCardiac
// @version      2026-06-08
// @description  adds a custom profile picture to ChatGPT
// @author       42@PseudoCardiac
// @match        https://chatgpt.com/*
// ==/UserScript==

const URL = "PASTE IMAGE URL HERE";
const NAME = "ENTER YOUR NAME HERE";

function addIcon ( target ) {
    const icon = document.createElement( "div" );

    icon.style.width = "10%";
    icon.style.aspectRatio = 1;
    icon.style.position = "sticky";
    icon.style.top = "3.25rem";
    icon.style.borderRadius = "50%";
    icon.style.backgroundImage = `url(${URL})`;
    icon.style.backgroundSize = "100% 100%";
    icon.style.zIndex = "-9";

    icon.classList.add( "assistant-icon" );

    target.appendChild( icon );
}

function addName ( target ) {
    const name = document.createElement( "div" );
    const nameText = document.createElement( "div" );
    name.appendChild( nameText );

    nameText.innerHTML = NAME;
    nameText.style.color = "white";
    nameText.style.fontSize = "XX-large";

    name.style.display = "flex";
    name.style.justifyContent = "center";
    name.style.alignItems = "center";
    name.style.width = "10%";
    name.style.aspectRatio = 1;
    name.style.position = "sticky";
    name.style.top = "3.25rem";
    name.style.marginLeft = "auto";
    name.style.marginRight = "0rem";
    name.style.borderRadius = "50%";
    name.style.background = "#444444"
    name.style.zIndex = "-9";

    name.classList.add( "user-name" );

    target.appendChild( name );
}

function addDummy( target, isLeft ) {
    const rect = target.getBoundingClientRect();
    const dummy = document.createElement("div");

    Object.assign( dummy.style, {
        position: "absolute",

        width: "100%",
        height: "100%",

        // background: "rgba(255, 0, 0, 0.3)",

        zIndex: "-10",
        pointerEvents: "none"
    } );

    if ( isLeft ) {
        Object.assign( dummy.style, {
            left: "-12.5%"
        } );
    } else {
        Object.assign( dummy.style, {
            right: "-12.5%"
        } );
    }

    dummy.classList.add( "dummy-div" )

    if ( isLeft ) {
        addIcon( dummy );
    } else {
        addName( dummy );
    }
    target.appendChild( dummy );
}


const observer = new MutationObserver( ( mutations ) => {
    for ( const mutation of mutations ) {
        for ( const node of mutation.addedNodes ) {
            if ( !( node instanceof HTMLElement ) ) continue;

            if ( node.matches( "div.agent-turn" ) ) {
                addDummy( node, true );
            } else if ( node.matches( "div[data-message-author-role=user]" ) ) {
                addDummy( node, false );
            }

            const Agents = node.querySelectorAll?.( "div.agent-turn" );
            const Users = node.querySelectorAll?.( "div[data-message-author-role=user]" );

            for ( const target of Agents ) {
                addDummy( target, true );
            }
            for ( const target of Users ) {
                addDummy( target, false );
            }
        }
    }
});

observer.observe( document.body, {
    childList: true,
    subtree: true
} );
