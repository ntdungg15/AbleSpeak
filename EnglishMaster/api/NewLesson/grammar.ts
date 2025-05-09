
export const fetchGrammarRules = () => {
  return new Promise((resolve) => {
    // Simulating API latency
    setTimeout(() => {
      resolve(grammarData);
    }, 300);
  });
};

// grammarDataPart1.js
export const grammarData = [
    {
      id: '1',
      title: 'Present Simple Tense',
      explanation: 'Used for habits, repeated actions, permanent situations, and general truths.',
      formula: {
        positive: 'Subject + V1(s/es) + Object',
        negative: 'Subject + do/does + not + V1 + Object',
        question: 'Do/Does + Subject + V1 + Object?'
      },
      grammar: 'Use the base form of the verb (infinitive without "to"), but add -s or -es in the third person singular (he/she/it). Use do/does for negative and question forms. Common time expressions: always, usually, often, sometimes, rarely, never, every day, once a week, etc.',
      examples: [
        'I play tennis every Sunday.',
        'The sun rises in the east.',
        'She works in a bank.'
      ],
      exercises: [
        { question: 'He ____ (work) in a hospital.', options: ['work', 'works', 'working', 'worked'], correctAnswer: 1 },
        { question: 'They ____ (study) English every day.', options: ['studies', 'study', 'studying', 'studied'], correctAnswer: 1 },
        { question: 'She always ____ (wake) up early.', options: ['wake', 'wakes', 'woke', 'waking'], correctAnswer: 1 },
        { question: 'We ____ (not like) spicy food.', options: ['don\'t like', 'doesn\'t like', 'not like', 'didn\'t like'], correctAnswer: 0 },
        { question: '____ he ____ (play) the guitar?', options: ['Do/play', 'Does/play', 'Is/playing', 'Did/play'], correctAnswer: 1 }
      ]
    },
    {
      id: '2',
      title: 'Present Continuous Tense',
      explanation: 'Used to describe actions happening now or around the current time, and for temporary situations.',
      formula: {
        positive: 'Subject + am/is/are + V-ing + Object',
        negative: 'Subject + am/is/are not + V-ing + Object',
        question: 'Am/Is/Are + Subject + V-ing + Object?'
      },
      grammar: 'Form with be (am/is/are) + present participle (verb + -ing). Use am with I, is with he/she/it, and are with you/we/they. Time expressions: now, at the moment, these days, currently, etc.',
      examples: [
        'I am studying for my exam.',
        'They are building a new house.',
        'She is living with her parents until she finds an apartment.'
      ],
      exercises: [
        { question: 'Look! It ____ (rain) outside.', options: ['rain', 'rains', 'is raining', 'rained'], correctAnswer: 2 },
        { question: 'We ____ (prepare) dinner at the moment.', options: ['prepare', 'prepares', 'are preparing', 'prepared'], correctAnswer: 2 },
        { question: 'They ____ (not watch) TV right now.', options: ['not watch', 'don\'t watch', 'aren\'t watching', 'doesn\'t watch'], correctAnswer: 2 },
        { question: '____ you ____ (wait) for someone?', options: ['Do/wait', 'Are/waiting', 'Is/waiting', 'Do/wait'], correctAnswer: 1 },
        { question: 'I ____ (learn) Japanese this year.', options: ['learn', 'learns', 'am learning', 'learned'], correctAnswer: 2 }
      ]
    },
    {
      id: '3',
      title: 'Present Perfect Tense',
      explanation: 'Used for past actions with a connection to the present, experiences, and changes over time.',
      formula: {
        positive: 'Subject + have/has + V3 + Object',
        negative: 'Subject + have/has not + V3 + Object',
        question: 'Have/Has + Subject + V3 + Object?'
      },
      grammar: 'Form with have/has + past participle (V3). Use have with I/you/we/they and has with he/she/it. Time expressions: just, already, yet, ever, never, since, for, recently, etc.',
      examples: [
        'I have lived here for ten years.',
        'She has visited Paris three times.',
        'They have just finished their homework.'
      ],
      exercises: [
        { question: 'She ____ (live) in London since 2010.', options: ['live', 'lives', 'has lived', 'had lived'], correctAnswer: 2 },
        { question: 'I ____ (never/see) a lion in real life.', options: ['never see', 'never saw', 'have never seen', 'had never seen'], correctAnswer: 2 },
        { question: 'They ____ (already/eat) lunch.', options: ['already eat', 'already ate', 'have already eaten', 'had already eaten'], correctAnswer: 2 },
        { question: '____ you ever ____ (visit) Japan?', options: ['Do/visit', 'Did/visit', 'Have/visited', 'Had/visited'], correctAnswer: 2 },
        { question: 'We ____ (not finish) the project yet.', options: ['not finish', 'don\'t finish', 'haven\'t finished', 'didn\'t finish'], correctAnswer: 2 }
      ]
    },
    {
      id: '4',
      title: 'Present Perfect Continuous Tense',
      explanation: 'Used for actions that started in the past and continue to the present, with emphasis on duration.',
      formula: {
        positive: 'Subject + have/has been + V-ing + Object',
        negative: 'Subject + have/has not been + V-ing + Object',
        question: 'Have/Has + Subject + been + V-ing + Object?'
      },
      grammar: 'Form with have/has + been + present participle (V-ing). Use have been with I/you/we/they and has been with he/she/it. Emphasis on duration. Time expressions: for, since, all day, recently, lately, etc.',
      examples: [
        'I have been working here for five years.',
        'It has been raining all day.',
        'She has been studying English since 2018.'
      ],
      exercises: [
        { question: 'I ____ (wait) for you for two hours.', options: ['wait', 'am waiting', 'have been waiting', 'had been waiting'], correctAnswer: 2 },
        { question: 'How long _______ you _______ (learn) English?', options: ['do/learn', 'are/learning', 'have/been learning', 'had/been learning'], correctAnswer: 2 },
        { question: 'She ____ (work) at this company since March.', options: ['works', 'is working', 'has been working', 'had been working'], correctAnswer: 2 },
        { question: 'They ____ (not talk) to each other for weeks.', options: ['don\'t talk', 'aren\'t talking', 'haven\'t been talking', 'hadn\'t been talking'], correctAnswer: 2 },
        { question: 'It ____ (snow) all day.', options: ['snows', 'is snowing', 'has been snowing', 'had been snowing'], correctAnswer: 2 }
      ]
    },
    {
      id: '5',
      title: 'Past Simple Tense',
      explanation: 'Used for completed actions in the past at a specific time.',
      formula: {
        positive: 'Subject + V2 + Object',
        negative: 'Subject + did + not + V1 + Object',
        question: 'Did + Subject + V1 + Object?'
      },
      grammar: 'Use the past form of the verb (V2) for all subjects. Use did for negative and question forms with base verb. Time expressions: yesterday, last week/month/year, ago, in 2010, when, etc.',
      examples: [
        'I visited my grandmother last weekend.',
        'She bought a new car last month.',
        'They played football yesterday.'
      ],
      exercises: [
        { question: 'I ____ (go) to the cinema last night.', options: ['go', 'goes', 'went', 'gone'], correctAnswer: 2 },
        { question: 'She ____ (not call) me yesterday.', options: ['not call', 'doesn\'t call', 'didn\'t call', 'hasn\'t called'], correctAnswer: 2 },
        { question: '____ they ____ (arrive) on time?', options: ['Do/arrive', 'Did/arrive', 'Have/arrived', 'Were/arriving'], correctAnswer: 1 },
        { question: 'We ____ (have) dinner at 8 pm last night.', options: ['have', 'has', 'had', 'having'], correctAnswer: 2 },
        { question: 'The train ____ (leave) at 6:30 this morning.', options: ['leave', 'leaves', 'left', 'has left'], correctAnswer: 2 }
      ]
    },
    {
        id: '6',
        title: 'Past Continuous Tense',
        explanation: 'Used for actions that were in progress at a specific time in the past.',
        formula: {
          positive: 'Subject + was/were + V-ing + Object',
          negative: 'Subject + was/were not + V-ing + Object',
          question: 'Was/Were + Subject + V-ing + Object?'
        },
        grammar: 'Form with "was"/"were" + present participle (verb + -ing). Use "was" with I/he/she/it and "were" with you/we/they. Time expressions: while, at that time, when, as.',
        examples: [
          'I was watching TV when she called.',
          'They were having dinner at 8 pm last night.',
          'What were you doing at this time yesterday?'
        ],
        exercises: [
          {
            question: 'I ____ (sleep) when the phone rang.',
            options: ['sleep', 'slept', 'was sleeping', 'am sleeping'],
            correctAnswer: 2
          },
          {
            question: 'What ____ you ____ (do) at 9 pm last night?',
            options: ['do / do', 'did / do', 'were / doing', 'are / doing'],
            correctAnswer: 2
          },
          {
            question: 'She ____ (not/study) when I visited her.',
            options: ['not study', 'didn\'t study', 'wasn\'t studying', 'hasn\'t studied'],
            correctAnswer: 2
          },
          {
            question: 'While they ____ (play) football, it started to rain.',
            options: ['play', 'played', 'were playing', 'are playing'],
            correctAnswer: 2
          },
          {
            question: 'The children ____ (sleep) when the earthquake happened.',
            options: ['sleep', 'slept', 'were sleeping', 'had slept'],
            correctAnswer: 2
          }
        ]
      },
      {
        id: '7',
        title: 'Past Perfect Tense',
        explanation: 'Used for actions completed before another past action or time.',
        formula: {
          positive: 'Subject + had + V3 (past participle) + Object',
          negative: 'Subject + had + not + V3 + Object',
          question: 'Had + Subject + V3 + Object?'
        },
        grammar: 'Form with "had" + past participle. Time expressions: before, after, by the time, when.',
        examples: [
          'I had finished my homework before dinner.',
          'She had never seen snow until last winter.',
          'By the time he arrived, we had left.'
        ],
        exercises: [
          {
            question: 'When I arrived, the movie ____ (already/start).',
            options: ['already starts', 'already started', 'had already started', 'has already started'],
            correctAnswer: 2
          },
          {
            question: 'She ____ (never/visit) New York before her trip last year.',
            options: ['never visits', 'never visited', 'had never visited', 'has never visited'],
            correctAnswer: 2
          },
          {
            question: 'By the time we got to the station, the train ____ (leave).',
            options: ['leaves', 'left', 'had left', 'has left'],
            correctAnswer: 2
          },
          {
            question: 'I ____ (not/finish) my work when my boss called.',
            options: ['don\'t finish', 'didn\'t finish', 'hadn\'t finished', 'haven\'t finished'],
            correctAnswer: 2
          },
          {
            question: '____ you ____ (complete) the report before the meeting?',
            options: ['Did / complete', 'Do / complete', 'Had / completed', 'Have / completed'],
            correctAnswer: 2
          }
        ]
      },
      {
        id: '8',
        title: 'Past Perfect Continuous Tense',
        explanation: 'Used for actions that continued up to a specific moment in the past, emphasizing duration.',
        formula: {
          positive: 'Subject + had + been + V-ing + Object',
          negative: 'Subject + had + not + been + V-ing + Object',
          question: 'Had + Subject + been + V-ing + Object?'
        },
        grammar: 'Form with "had been" + present participle. Time expressions: for, since, all day, before.',
        examples: [
          'I had been working for three hours when she called.',
          'They had been living in Paris for ten years before they moved to London.',
          'She had been studying all night, so she was very tired.'
        ],
        exercises: [
          {
            question: 'I was tired because I ____ (run) for two hours.',
            options: ['run', 'ran', 'had been running', 'have been running'],
            correctAnswer: 2
          },
          {
            question: 'How long ____ you ____ (wait) before the bus came?',
            options: ['did / wait', 'do / wait', 'had / been waiting', 'have / been waiting'],
            correctAnswer: 2
          },
          {
            question: 'She ____ (work) at the company for five years before she got promoted.',
            options: ['works', 'worked', 'had been working', 'has been working'],
            correctAnswer: 2
          },
          {
            question: 'They ____ (argue) for hours before they reached an agreement.',
            options: ['argue', 'argued', 'had been arguing', 'have been arguing'],
            correctAnswer: 2
          },
          {
            question: 'His clothes were dirty because he ____ (play) football.',
            options: ['plays', 'played', 'had been playing', 'has been playing'],
            correctAnswer: 2
          }
        ]
      },
      {
        id: '9',
        title: 'Future Simple Tense (will)',
        explanation: 'Used for predictions, spontaneous decisions, promises, and future facts.',
        formula: {
          positive: 'Subject + will + V1 + Object',
          negative: 'Subject + will not (won\'t) + V1 + Object',
          question: 'Will + Subject + V1 + Object?'
        },
        grammar: 'Use "will" + base verb. Time expressions: tomorrow, next week, soon, in the future.',
        examples: [
          'I will help you with your homework.',
          'It will rain tomorrow.',
          'She will be 25 next month.'
        ],
        exercises: [
          {
            question: 'I think it ____ (rain) tomorrow.',
            options: ['rains', 'rained', 'will rain', 'is raining'],
            correctAnswer: 2
          },
          {
            question: 'Don\'t worry, I ____ (help) you with your luggage.',
            options: ['help', 'helped', 'will help', 'am helping'],
            correctAnswer: 2
          },
          {
            question: 'She ____ (not/come) to the party tomorrow.',
            options: ['not come', 'doesn\'t come', 'won\'t come', 'isn\'t coming'],
            correctAnswer: 2
          },
          {
            question: '____ you ____ (attend) the meeting next week?',
            options: ['Do / attend', 'Are / attending', 'Will / attend', 'Did / attend'],
            correctAnswer: 2
          },
          {
            question: 'I ____ (be) 30 years old next year.',
            options: ['am', 'was', 'will be', 'have been'],
            correctAnswer: 2
          }
        ]
      },
      {
        id: '10',
        title: 'Future Continuous Tense',
        explanation: 'Used for actions that will be in progress at a specific time in the future.',
        formula: {
          positive: 'Subject + will be + V-ing + Object',
          negative: 'Subject + will not (won\'t) be + V-ing + Object',
          question: 'Will + Subject + be + V-ing + Object?'
        },
        grammar: 'Use "will be" + present participle. Time expressions: this time tomorrow, at 8 pm, next week.',
        examples: [
          'This time tomorrow, I will be flying to Paris.',
          'They will be studying for their exams next week.',
          'She will be waiting for you when you arrive.'
        ],
        exercises: [
          {
            question: 'This time next week, I ____ (sit) on a beach in Hawaii.',
            options: ['sit', 'sat', 'will sit', 'will be sitting'],
            correctAnswer: 3
          },
          {
            question: 'At 8 pm tonight, they ____ (have) dinner.',
            options: ['have', 'had', 'will have', 'will be having'],
            correctAnswer: 3
          },
          {
            question: 'She ____ (not/work) at this time tomorrow.',
            options: ['not work', 'doesn\'t work', 'won\'t work', 'won\'t be working'],
            correctAnswer: 3
          },
          {
            question: '____ you ____ (use) your car this weekend?',
            options: ['Do / use', 'Will / use', 'Are / using', 'Will / be using'],
            correctAnswer: 3
          },
          {
            question: 'Don\'t call at 7 pm, we ____ (watch) the match then.',
            options: ['watch', 'watched', 'will watch', 'will be watching'],
            correctAnswer: 3
          }
        ]
      },
      {
        id: '11',
        title: 'Future Perfect Tense',
        explanation: 'Used for actions that will be completed before a specific time in the future.',
        formula: {
          positive: 'Subject + will have + V3 (past participle) + Object',
          negative: 'Subject + will not (won\'t) have + V3 + Object',
          question: 'Will + Subject + have + V3 + Object?'
        },
        grammar: 'Use "will have" + past participle. Time expressions: by, by the time, before.',
        examples: [
          'By next year, I will have graduated from university.',
          'She will have finished the project by Friday.',
          'They will have lived here for ten years by next month.'
        ],
        exercises: [
          {
            question: 'By the end of this year, I ____ (work) here for five years.',
            options: ['work', 'worked', 'will work', 'will have worked'],
            correctAnswer: 3
          },
          {
            question: 'She ____ (finish) the book by tomorrow.',
            options: ['finishes', 'finished', 'will finish', 'will have finished'],
            correctAnswer: 3
          },
          {
            question: 'By the time you arrive, we ____ (leave).',
            options: ['leave', 'left', 'will leave', 'will have left'],
            correctAnswer: 3
          },
          {
            question: 'They ____ (not/complete) the construction by next month.',
            options: ['don\'t complete', 'didn\'t complete', 'won\'t complete', 'won\'t have completed'],
            correctAnswer: 3
          },
          {
            question: '____ she ____ (arrive) by the time we get there?',
            options: ['Does / arrive', 'Did / arrive', 'Will / arrive', 'Will / have arrived'],
            correctAnswer: 3
          }
        ]
      },
      {
        id: '12',
        title: 'Future Perfect Continuous Tense',
        explanation: 'Used for actions that will continue up to a specific point in the future, emphasizing duration.',
        formula: {
          positive: 'Subject + will have been + V-ing + Object',
          negative: 'Subject + will not (won\'t) have been + V-ing + Object',
          question: 'Will + Subject + have been + V-ing + Object?'
        },
        grammar: 'Use "will have been" + present participle. Time expressions: by, for, since.',
        examples: [
          'By next month, I will have been working here for five years.',
          'She will have been teaching for 20 years when she retires.',
          'They will have been living in this house for a decade next year.'
        ],
        exercises: [
          {
            question: 'By the end of next month, she ____ (study) English for two years.',
            options: ['studies', 'studied', 'will have studied', 'will have been studying'],
            correctAnswer: 3
          },
          {
            question: 'Next week, we ____ (live) in this city for ten years.',
            options: ['live', 'lived', 'will have lived', 'will have been living'],
            correctAnswer: 3
          },
          {
            question: 'By midnight, I ____ (work) on this project for 12 hours straight.',
            options: ['work', 'worked', 'will have worked', 'will have been working'],
            correctAnswer: 3
          },
          {
            question: 'The company ____ (operate) for 50 years by 2030.',
            options: ['operates', 'operated', 'will have operated', 'will have been operating'],
            correctAnswer: 3
          },
          {
            question: 'How long ____ you ____ (wait) by the time the train arrives?',
            options: ['will / wait', 'did / wait', 'will / have waited', 'will / have been waiting'],
            correctAnswer: 3
          }
        ]
      }
  ];
  