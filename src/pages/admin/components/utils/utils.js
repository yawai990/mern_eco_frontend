export const changeCategory = (e,categories, setAttributesFromDB, setCategoryChoosen ) =>{
    const categoryName = e.target.value.split('/')[0];

   const highLevelCategory =  categories.find(item => item.name === categoryName);

   if(highLevelCategory && highLevelCategory.attrs) {
    setAttributesFromDB(highLevelCategory.attrs)
   }else{
    setAttributesFromDB([])
   }
   setCategoryChoosen(e.target.value)
  };

export const setValueFromAttrForm  = (e, valueRef, attributesFromDB) =>{
    if(e.target.value !== 'Choose attribute') {

      // if the user select the ram ; it's return the ram values from the array
      const selectedAttr = attributesFromDB.find(item => item.key === e.target.value);

      // get the select option things;
      let valuesForAttrkeys = valueRef.current;

      if( selectedAttr && selectedAttr.value.length > 0 ){

        // everytime the option... remove the first option which is just show case;
        while(valuesForAttrkeys.options.length){
          //removing the choose value option
          valuesForAttrkeys.options.remove(0)
        }
        valuesForAttrkeys.options.add(new Option('Choose Attribute Value'))
        selectedAttr.value.map(item => (
          valuesForAttrkeys.options.add(new Option(item))
        ))
      }
    }
  };

export const setAttributeWrapper = (key,value, setAttributeTable) =>{
  
  setAttributeTable(attr => {
     
    if( attr.length !== 0){
        let  keyExistsInOldTable =false;

       const modifiedTable = attr.map(item => {
          if(item.key === key){
            keyExistsInOldTable = true;
            item.value = value;

            return item;
          }else{
              return item;
          };
        });

        if(keyExistsInOldTable) return [...modifiedTable]
        else return [...modifiedTable, { key, value}]
    }else {
      return [{key,value}]
    }
  })
};