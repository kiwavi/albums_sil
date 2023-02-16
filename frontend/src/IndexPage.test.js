import { render, screen } from '@testing-library/react';
import IndexPage from './IndexPage';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Home',() => {
    const mockStore = createMockStore([]);

    const state = {
    };
    
    const store = mockStore(state);    
    
    it('renders IndexPage component', ()=>{        
        render(
            <Provider store={store}>
              <Router>
                <IndexPage/>
              </Router>
            </Provider>
        );
    });
});
