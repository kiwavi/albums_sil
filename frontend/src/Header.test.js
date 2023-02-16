import { render, screen } from '@testing-library/react';
import Header from './Header';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Header', () => {
    const mockStore = createMockStore([]);
    
    const state = {
        
    };
    
    const store = mockStore(state);    
    
    it('renders Header component', ()=>{        
        render(
            <Provider store={store}>
              <Router>
                <Header/>
              </Router>
            </Provider>
        );
    });
});
