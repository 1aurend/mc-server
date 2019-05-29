

function makeQsReadable(idsArray, questions) {


  let readableQs = []

  questions.map(question => {

    let update = question

    for (var i = 0; i < update.fields.answers.length; i++) {
      for (var j = 0; j < idsArray.length; j++) {
        if (update.fields.answers[i] === idsArray[j].idA) {
          update.fields.answers[i] = idsArray[j].text
          break
        }
      }
    }

    for (var k = 0; k < update.fields.choices.length; k++) {
      for (var l = 0; l < idsArray.length; l++) {
        if (update.fields.choices[k] === idsArray[l].idC) {
          update.fields.choices[k] = idsArray[l].text
          break
        }
      }
    }

    readableQs.push(update)

  })

return readableQs

}


export default makeQsReadable
