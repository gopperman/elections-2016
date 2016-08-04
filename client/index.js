import React from 'react'
import { render } from 'react-dom'
import App from './../common/components/App.js'

// eslint-disable-next-line no-unused-vars
import css from './../common/styles/config.styl'

const rootElement = document.getElementById('root')

render(<App />, rootElement)
