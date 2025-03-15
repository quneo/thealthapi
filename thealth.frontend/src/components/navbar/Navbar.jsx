import React from "react";
import styles from './Navbar.module.css'

function Navbar() {
    return(
        <nav className={styles['nav']}>
            <div className={styles['container']}>
                <div className={styles['nav-col']}>
                    <div className={styles['logo']}>
                        "LOGO"
                        {/* div переделать в картинку */}
                    </div>
                    <ul className={styles['nav-list']}>
                        <li className={`${styles['nav-list__item']} ${styles['nav-list__item--active']}`}>
                            {/* иконка */}
                            Профиль
                        </li>
                        <li className={styles['nav-list__item']}>
                            {/* иконка */}
                            Новости
                        </li>
                        <li className={styles['nav-list__item']}>
                            {/* иконка */}
                            Сообщения
                        </li>
                        <li className={styles['nav-list__item']}>
                            {/* иконка */}
                            Друзья
                        </li>
                        <li className={styles['nav-list__item']}>
                            {/* иконка */}
                            Заметки
                        </li>
                        <li className={styles['nav-list__item']}>
                            {/* иконка */}
                            Расписание
                        </li>
                        <li className={styles['nav-list__item']}>
                            {/* иконка */}
                            Дневник
                        </li>
                        <li className={styles['nav-list__item']}>
                            {/* иконка */}
                            Тренировки
                        </li>
                        <li className={styles['nav-list__item']}>
                            {/* иконка */}
                            Статистика
                        </li>
                        <li className={styles['nav-list__item']}>
                            {/* иконка */}
                            Настройки
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;