import React from 'react';
import '@testing-library/jest-dom'
import {shallow} from 'enzyme'
import { GifExpertApp } from '../GifExpertApp';

describe('GifExpertApp', () => {
    let wrapper;

    beforeEach(()=>{
        wrapper=shallow(<GifExpertApp/>)
    })

    test('should render GifExpertApp component', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should show a list of categories',()=>{
        const categories=['Avengers','Messi']
        wrapper=shallow(<GifExpertApp defaultCategories={categories}/>)

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('GifGrid').length).toBe(categories.length)
    })
    
})
