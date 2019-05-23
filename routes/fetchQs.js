import express from 'express'
import Airtable from 'airtable'
import matchIDs from '../tools/matchids.js'

const router = express.Router()
require('dotenv').config()

const gameLabBase = new Airtable({apiKey: process.env.GAMELAB_AT_KEY}).base(process.env.GAMELAB_BASE_ID)



router.get('/', (req, res) => {

    async function fetchReadableQs(matchIDs) {

      let questions = []
      let choices = []
      let answers = []
      console.log(`Fetching Quiz Data -----------------------`);


      const fetchQs = gameLabBase('flashcardQs').select({
          maxRecords: 100,
          view: "Grid View"
        }).then(records => {records.forEach((record) => {
              console.log('Retrieved', record.get('questionText'))
              questions.push(record._rawJson)
          })}
        ).then(err => {
          if (err) { console.error(err) return }
          return 'questions fetched'
          })

      const fetchAs = gameLabBase('fcAnswers').select({
          maxRecords: 100,
          view: "Grid View"
        }).then(records => {records.forEach((record) => {
              console.log('Retrieved', record.get('questionText'))
              questions.push(record._rawJson)
          })}
        ).then(err => {
          if (err) { console.error(err) return }
          return 'questions fetched'
          })

      const fetchCs = gameLabBase('fcChoices').select({
          maxRecords: 100,
          view: "Grid View"
        }).then(records => {records.forEach((record) => {
              console.log('Retrieved', record.get('questionText'))
              questions.push(record._rawJson)
          })}
        ).then(err => {
          if (err) { console.error(err) return }
          return 'questions fetched'
          })


      console.log(await fetchQs);
      console.log(await fetchAs);
      console.log(await fetchCs);

      const quizData = matchIDs(questions, answers, choices);
      return res.json({data: quizData});

      }

fetchReadableQs(matchIDs);

})



export default router
