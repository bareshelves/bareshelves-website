export const questions = [
  {
    title: `## I'm baby dIY gochujang blog truffaut?`,
    answer: `Adaptogen 3 wolf moon bespoke echo park gluten-free portland venmo poke semiotics kogi. Shabby chic gastropub pok pok crucifix freegan asymmetrical live-edge hell of kombucha lomo.`,
  },
  {
    title: `## Art party kitsch chambray ennui bitters keffiyeh?`,
    answer: `Pok pok twee gentrify kale chips street art farm-to-table. Pork belly lomo sustainable tumblr godard readymade. IPhone iceland kinfolk, tilde mustache bicycle rights helvetica unicorn neutra keffiyeh af meh sriracha synth pour-over.`,
  },
  {
    title: `## La croix affogato chillwave vice roof party vinyl celiac pitchfork?`,
    answer: `Typewriter skateboard sustainable cardigan kinfolk. Leggings single-origin coffee pour-over paleo, try-hard glossier PBR&B venmo sartorial af shabby chic woke church-key whatever.`,
  },
  {
    title: `## Pug occupy tilde pickled kombucha. Tumeric mumblecore iPhone quinoa before they sold out?`,
    answer: `Occupy pok pok prism photo booth vinyl asymmetrical put a bird on it distillery single-origin coffee artisan. Tumeric hell of poke offal. Next level chartreuse fam direct trade authentic.`,
  },  
]

import md from 'marked'

questions.forEach(question => {
  question.title = md(question.title)
  question.answer = md(question.answer)
})

export default questions
