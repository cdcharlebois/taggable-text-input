import { createElement, useState } from "react";
import { MentionsInput, Mention } from 'react-mentions'

export default ({attribute, tempIdAttr, onAddAction, onRemoveAction, datasource, displayAttr}) => {
    const [tags, setTags] = useState([]);
    const getPossibleTags = () => {
        return datasource.status !== "available" ? null :
        datasource.items.map(i => ({
            id: i.id,
            display: displayAttr.get(i).value
        })) 
    }
    const handleChange = (e, newValue, newPlainTextValue, mentions) => {
        /**
         * I feel like this block can be cleaned up quite a bit.
         */
        attribute.setValue(newValue);
        if (tags.length !== mentions.length) {
            // added?
            if (tags.length < mentions.length){
                const addedTag = mentions.find(m => {
                    return !tags.find(t => t.id === m.id ) 
                })
                if ( addedTag ){
                    console.log(`added tag: ${addedTag.display}`)
                    handleAdd(addedTag);
                }   
            }
            // removed?
            else {
                const removedTag = tags.find(t => {
                    return !mentions.find(m => t.id === m.id ) 
                })
                if ( removedTag ){
                    console.log(`removed tag: ${removedTag.display}`)
                    handleRemove(removedTag);
                } 
            }
        }
        setTags(mentions);
    }
    const handleAdd = (addedTag) => {
        tempIdAttr.setValue(""+addedTag.id);
        onAddAction.execute();
    }
    const handleRemove = (removedTag) => {
        tempIdAttr.setValue(""+removedTag.id);
        onRemoveAction.execute();
    }
    return (attribute.status === "available" ?
        <div>
            <MentionsInput value={attribute.value} onChange={handleChange}>
                <Mention
                    trigger="@"
                    data={getPossibleTags()}
                />
            </MentionsInput>
        </div> : null

    )
}