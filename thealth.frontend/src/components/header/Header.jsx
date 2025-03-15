import React from "react";
import styles from './Header.module.css'
import avatar from '../../img/Avatar.jpg'

function Header() {
    return(
        <header className={styles['container']}>
            {/* <div className={styles['container']}> */}
                <div className={styles['header-row']}>
                    <div className={styles['search-bar']}>
                        {/* img лупа  */}
                        <input placeholder="Поиск" />
                    </div>
                    <button className={styles['menu-button']}>
                        <div className={styles['user-icon']}>
                            {/* аватарка */}
                            <img src={avatar} alt="User  Avatar" className={styles['image']} />
                        </div>
                        <div>
                            c{/* стрелочка вниз */}
                        </div>
                    </button>
                    <nav className={styles['menu']}>
                        <ul className={styles['menu-list']}>
                            <li className={styles['menu-list__item']}>
                                Профиль
                            </li>
                            <li className={styles['menu-list__item']}>
                                Настройки
                            </li>
                            <li className={styles['menu-list__item']}>
                                Выйти
                            </li>
                        </ul>
                    </nav>
                </div>
            {/* </div> */}
        </header>
    )
}

export default Header;