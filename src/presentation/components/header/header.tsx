import React, { memo } from 'react'

import Styles from './header-styles.scss'

import { Logo } from '@/presentation/components'

const Header = () => {
    return (
        <header className={Styles.headerWrap}>
            <div className={Styles.headerContent}>
                <Logo />
                <div className={Styles.logoutWrap}>
                    <span data-testid="username">Igor Ribeiro</span>
                    <a data-testid="logout" href="#" onClick={() => console.log('asdas')}>Sair</a>
                </div>
            </div>
        </header>
    )
}

export default memo(Header)