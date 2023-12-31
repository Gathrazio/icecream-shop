import Category from './sub-components/Category'
import CategoryNav from './sub-components/CategoryNav'
import strawberryShake from '../assets/strawberry_shake.png'
import icecreamCone from '../assets/icecreamcone.png'
import realSandwich from '../assets/real-sandwich.png'
import { useEffect, useState } from 'react'
import sub from '../assets/sub.png'

export default function Categories ({userCart, updateUserCart, verifiedUserInfo, scrollDown}) {

    const defaultView = (
        <div className="categories-wrapper">
            <div className="shake-wrapper ultimos" onClick={() => {
                setNavTool(1)
                scrollDown()
            }}>
                <img src={strawberryShake} className="categories-image" />
                <div className="category-focus">
                    <h2 className="category-decide-title">Shakes</h2>
                    <span className="category-decide-description">Quenches thirst for at least one trillion years. That's right.</span>
                </div>
            </div>
            <div className="icecream-wrapper ultimos" onClick={() => {
                scrollDown()
                setNavTool(2)
                }}>
                <img src={icecreamCone} className="categories-image" />
                <div className="category-focus">
                    <h2 className="category-decide-title">Icecream</h2>
                    <span className="category-decide-description">Polar-fresh creamy nectar of the gods. Need we say more?</span>
                </div>
            </div>
            <div className="sandwich-wrapper ultimos" onClick={() => {
                scrollDown()
                setNavTool(3)
                }}>
                <img src={sub} className="categories-image cat-image-larger" />
                <div className="category-focus">
                    <h2 className="category-decide-title">Sandwiches</h2>
                    <span className="category-decide-description">Nutritious, delicious, and truly fulfilling in every conceivable way.</span>
                </div>
            </div>
        </div>
    )

    function navReturn () {
        setNavTool(0)
    }

    const [navTool, setNavTool] = useState(0);
    const [displayComponent, setDisplayComponent] = useState(defaultView)

    useEffect(() => {
        if (navTool === 0) {
            setDisplayComponent(defaultView)
        } else if (navTool === 1) {
            setDisplayComponent(<Category
                category="Shakes"
                navReturn={navReturn}
                userCart={userCart}
                updateUserCart={updateUserCart}
                verifiedUserInfo={verifiedUserInfo}
            />)
        } else if (navTool === 2) {
            setDisplayComponent(<Category
                category="Icecream"
                navReturn={navReturn} 
                userCart={userCart}
                updateUserCart={updateUserCart}
                verifiedUserInfo={verifiedUserInfo}
            />)
        } else {
            setDisplayComponent(<Category
                category="Sandwiches"
                navReturn={navReturn}
                userCart={userCart}
                updateUserCart={updateUserCart}
                verifiedUserInfo={verifiedUserInfo}
            />)
        }
    }, [navTool, userCart])

    return (displayComponent)
}