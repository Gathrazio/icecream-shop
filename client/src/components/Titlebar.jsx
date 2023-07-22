import logo from '../assets/icecream-logo.png'

export default function Titlebar () {
    return (
        <div className="titlebar-wrapper">
            <div className="titlebar-leftside-wrapper">
                <img src={logo} className="titlebar-logo"/>
                <h1 className="title">The Icecream Zone</h1>
            </div>
            <div className="titlebar-rightside-wrapper">
                <h3>Incredible, peerless flavors!</h3>
            </div>
            
        </div>
    )
}