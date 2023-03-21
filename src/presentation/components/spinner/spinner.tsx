import React from 'react'
import S from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement> & {
    isNegative?: boolean
}

function Spinner(props: Props) {
    const negativeClass = props.isNegative ? S.negative : ''
    return (
        <div {...props} className={[S.spinner, negativeClass, props.className].join(' ')} data-testid="spinner" >
            <div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Spinner