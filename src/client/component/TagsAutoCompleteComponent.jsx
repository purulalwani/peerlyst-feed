import React from 'react'
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

function states() {
  return [
    {abbr: 'Tag1', name: 'Tag1'},
    {abbr: 'Tag2', name: 'Tag2'},
    {abbr: 'Tag3', name: 'Tag2'},
  ]
}


let TagsSuggestions = [];

export function setSuggestions(data) {

  TagsSuggestions = data;
}
  
function autocompleteRenderInput ({addTag, ...props}) {
  
    console.log("Add tag -> ", addTag);

    console.log("props -> ", props)
    console.log("props -> ", props.ref)
      const handleOnChange = (e, {newValue, method}) => {
        if (method === 'enter') {
          e.preventDefault()
        } else {
          props.onChange(e)
        }
      }

      const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
      const inputLength = inputValue.length
      
      console.log("TagsSuggestions -> ", TagsSuggestions)
      let suggestions = TagsSuggestions.filter((state) => {
        return state.toLowerCase().slice(0, inputLength) === inputValue
      })

      return (
        <Autosuggest
          ref={props.ref}
          suggestions={suggestions}
          shouldRenderSuggestions={(value) => value && value.trim().length > 0}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <span>{suggestion}</span>}
          inputProps={{...props, onChange: handleOnChange}}
          onSuggestionSelected={(e, {suggestion}) => {
            addTag(suggestion)
          }}
          onSuggestionsClearRequested={() => {}}
          onSuggestionsFetchRequested={() => {}}
        />
      )
    }

    
  


export default autocompleteRenderInput;