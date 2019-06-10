import express from 'express'
import Airtable from 'airtable'
import matchIDs from '../tools/matchids.js'
import makeQsReadable from '../tools/makeqsreadable.js'

const router = express.Router()
require('dotenv').config()
const cors = require('cors')

const gameLabBase = new Airtable({apiKey: process.env.GAMELAB_AT_KEY}).base(process.env.GAMELAB_BASE_ID)



router.get('/', cors(), (req, res) => {

    let numQs = 3

    async function fetchReadableQs() {

      let questions = []
      let choices = []
      let answers = []
      console.log(`Fetching Quiz Data -----------------------`);


      const Qs = gameLabBase('mtQuestions').select({
            maxRecords: numQs,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {

            records.forEach(function(record) {
                console.log('Retrieved', record.get('questionText'));
                questions.push(record._rawJson)
            })
            fetchNextPage()

        }).then(() => {return 'got Qs!'})


      console.log(await Qs)

      // const quizData = matchIDs(questions, answers, choices, makeQsReadable)
      console.log(JSON.stringify(questions, null, 4));
      return res.json(JSON.stringify(questions, null, 4))



      }

fetchReadableQs()

})



export default router
