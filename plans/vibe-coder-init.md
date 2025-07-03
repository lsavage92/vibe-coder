# Vibe Coder

## Init prompt

I'd like to start developing an incremental idler game (e.g. Universal Paperclip: https://www.decisionproblem.com/paperclips/index2.html). I'd like to keep the web application as lightweight as we can but still using technologies I'm familiar with. I'd recommend:

- React.js
- Typescript
- Zustand or Context API for statemanagement

I'm using Claude Code to do a majority of the development so I'll need to work with you to ultimately break this promblem down into a Product Requirements Document and then eventually break that down into bite-sized prompts that Claude Code could use to begin. I have some game details ready and some general ideas about UI. How do you suggest we begin?

## Game Details
Game Title: Vibe Coder

Incremental idler game where the theme is you are a vibe coder who wants to create new, profitable businesses as quickly as possible. The core resource is money in dollars. You start off with only enough money for a 1 month subscription to the worst performing AI model on the market, Sloppy Copy ($20). If you hit $0 then you lose. 

To progress you need to make profitable businesses to afford your operating costs. AI subscription costs go up every 2 months. There are higher and higher tiers of AI models available which are higher priced. Each tier of model has different levels of "quality" which will impact how performant the businesses it can generate are.

A profitable business is one that balances 5 traits:
- Usefulness
- Fun
- Operating cost
- Price
- Monthly Active Users (aka number of subscriptions)

All businesses have a monthly subscription cost. Usefulness and fun are a sliding scale of 0%-100%. The player can only control Price. The quality of the model determines how fun and useful the business is. This is pseudorandom.

Some businesses can never be profitable and the player needs to determine if that’s the case and shut down the business if needed. 

All businesses are internet based businesses. 

For the UI, I'd like to take inspiration from Universal Paperclip's minimal, plain text/HTML style. I'm thinking that we could build "panes" similar to the CLI utility tmux where each pane represents a single business. Or we could use "tabs" like a browser or maybe both! I think it might have to change depending on the users screen size. In my mind, the UI starts off minimal but as the user becomes more and more profitable, the UI slowly becomes more and more "vaporwave" inspired. Gradients, purples, blues, waves, shine, performant animations etc. We can hammer out more of those details later but for now lets start with the plain HTML style

## Stretch

- Some AI models don’t even exist at the beginning because new ones are being created all the time. These can be introduced to the user over time and somewhat randomized. 

## Scratch

- Multiple “tabs” or split pane to show multiple businesses statuses
- Vibe coded apps are autonomously operated and improved. However lower quality models can botch the codebase which requires a rewrite or deleting the business
    