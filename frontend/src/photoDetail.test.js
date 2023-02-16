import { render, screen } from '@testing-library/react';
import PhotoDetail from './photoDetail';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import {BrowserRouter as Router} from 'react-router-dom';

describe('PhotoDetail', () => {
    const mockStore = createMockStore([]);
    
    const state = {
        
    };
    
    const store = mockStore(state);    
    
    it('renders PhotoDetail component', ()=>{        
        render(
            <Provider store={store}>
              <Router>
                <PhotoDetail/>
              </Router>
            </Provider>
        );
    });
});
