import React, { memo } from 'react'
import S from './footer.scss'

function Footer() {
    return (
        <footer className={S.footer} />
    );
}

export default memo(Footer);