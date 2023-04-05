import React, { useContext } from 'react'
import Styles from './error-styles.scss'
import { SurveyContext } from '@/presentation/pages/survey-list/components'

type Props = {
  error: string
  reload: () => void;
}

export default function Error({ error, reload }: Props) {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button
        data-testid="reload"
        onClick={reload}
      >
        Tentar novamente
      </button>
    </div>
  )
}
