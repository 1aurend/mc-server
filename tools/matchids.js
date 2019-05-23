import makeQsReadable from './makeqsreadable.js'

function matchIDs (questions, answers, choices, makeQsReadable) {

  let namestoAnswerIDs = []
  let addChoiceIDs = []

    answers.map(answer => {

      let match = {
        text: answer.fields.name,
        idA: answer.id
       }

       namestoAnswerIDs.push(match)
       return
    })

    namestoAnswerIDs.map(item => {

      for (var i = 0; i < choices.length; i++) {
        if (choices[i].fields.name === item.text) {
          item = {...item, idC: choices[i].id}
          addChoiceIDs.push(item)
        }
      }
        return
      }
    )


  return makeQsReadable(addChoiceIDs, questions)
}



export default matchIDs
