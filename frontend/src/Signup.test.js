import { render, screen } from '@testing-library/react';
import Signup from './Signup';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import {BrowserRouter as Router} from 'react-router-dom';


describe('Signup', () => {
    const mockStore = createMockStore([]);
    
    const state = {
        
    };
    
    const store = mockStore(state);    
    
    it('renders Signup component', ()=>{        
        render(
            <Provider store={store}>
              <Router>
                <Signup/>
              </Router>
            </Provider>
        );
    });
});
