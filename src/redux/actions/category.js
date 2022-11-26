import * as actionTypes from '../constants/category';
import axios from 'axios';

export const getCategories = () => async (dispatch) =>{
    const { data } = await axios.get('/api/categories');

    dispatch({
        type: actionTypes.GET_CATEGORY,
        payload : data
    })
};

export const saveAttributetoCatDoc = (key,value, categoryChoosen ) => async(dispatch, getState ) =>{
    console.log(key,value,categoryChoosen)
    const { data } = await axios.post('/api/categories/attr', { key, value, categoryChoosen});

    if( data.categoryUpdated ) {
        dispatch({
            type: actionTypes.SAVE_ATTR,
            payload : [...data.categoryUpdated]
        })
    }
};

export const newCategory = (category) => async ( dispatch, getState ) =>{
    const cat = getState().getCategories.categories;
    const { data } = await axios.post('/api/categories', { category});

    if( data.createCategory) {
        dispatch({
             type : actionTypes.INSERT_CATEGORY,
             payload : [...cat, data.createCategory]
        })
    }
};

export const deleteCategory = (category) => async (dispatch,getState) =>{

    //take the current categories from redux store
    const cat = getState().getCategories.categories;

    const categories = cat.filter(c => c.name !== category);

    const { data } = await axios.delete(`/api/categories/${decodeURIComponent(category)}`);

    if(data.categoryDeleted){
      dispatch({
        type: actionTypes.DELETE_CATEGORY,
        payload : [...categories]
      })
    }

}