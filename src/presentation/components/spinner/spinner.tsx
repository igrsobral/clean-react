import React from 'react'
import S from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

function Spinner(props: Props) {
    return (
        <div {...props} className={S.spinner}>
            <div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Spinner