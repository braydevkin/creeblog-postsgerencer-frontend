import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import timeline from './pages/timeline/index'
import New from './pages/new/index'
import Show from './pages/show/index'
import Edit from './pages/edit/index'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={timeline} />
                <Route path='/newpost'  component={New} />
                <Route path='/view/:id' component={Show} /> 
                <Route path='/repost/:id' component={Edit} /> 
            </Switch>
        </BrowserRouter>
    )
}