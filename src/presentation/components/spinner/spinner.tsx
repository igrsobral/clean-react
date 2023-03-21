import React from 'react'
import S from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement> & {
    isNegative?: boolean
}

const Spinner = ({ isNegative, ...props }: Props) => {
    const negativeClass = isNegative ? S.negative : ''
    return (
        <div {...props} data-testid="spinner" className={[S.spinner, negativeClass, props.className].join(' ')}  >
            <div>  </div> <div> </div>
        </div>
    )
}

export default Spinner