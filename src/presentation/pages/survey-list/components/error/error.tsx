import React, { useContext } from 'react'
import Styles from './error-styles.scss'
import { SurveyContext } from '@/presentation/pages/survey-list/components'

export default function Error() {
  const { state, setState } = useContext(SurveyContext)

  const reload = () => {
    setState({ surveys: [], error: '', reload: !state.reload  })
  }
  return (
    <div className={Styles.errorWrap}>
        <span data-testid="error">{state.error}</span>
        <button 
          data-testid="reload"
          onClick={reload}
        >
          Tentar novamente
        </button>
    </div>
  )
}
