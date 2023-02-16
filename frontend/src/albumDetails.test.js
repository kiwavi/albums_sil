import { render } from '@testing-library/react';
import AlbumDetails from './albumDetails';
import * as React from 'react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import {BrowserRouter as Router} from 'react-router-dom';

describe('AlbumDetails', () => {
    const mockStore = createMockStore([]);
    
    const state = {
        
    };
    
    const store = mockStore(state);    
    
    it('renders AlbumDetails component', ()=>{        
        render(
            <Provider store={store}>
              <Router>
                <AlbumDetails/>
              </Router>
            </Provider>
        );
    });
});
