Business Generation & Management:

How often can you generate new businesses? (cooldown, cost, instant?)
    - There should be a cooldown that is analogous to "usage limits" with most real life AI subscriptions
    - lower tier models have longer cooldowns
    - I'm not sure yet what the cooldowns should be so let's just make it an adjustable constant and a scaling function we can change to make it more fun as cooldowns decreased when better models are purchased
What's the max number of businesses you can run simultaneously?
    - This is a good question... Let's start with unlimited but build a limit into the system. Limiting the number of businesses might be an interesting constraint leading to more fun
Do businesses have a lifespan, or do they run indefinitely until shut down?
    - They run indefinitely until shut down
How do you determine if a business is profitable? (simple revenue > costs?)
    - Yup! Revenue must be greater than costs

AI Model Progression:

What are the tier names? (Sloppy Copy → ??? → GPT-like → ???)
    - Can you help me generate some names? I like sloppy copy as the first one to poke fun at the concept of "AI slop". The general idea is the names go from low quality, crappy sounding names to cooler and more powerful sounding names as they get better.
How much do costs increase every 2 months? (flat rate, percentage?)
    - Let's start with a flat cost. I think eventually a percentage will be necessary to simulate exponential growth of not only cost but revenue
Does model quality affect generation speed or just business quality?
    - I think it should be both. I also think there should be a failure rate that gets lower as the model quality increases. If generation fails, you have to restart generating.

Business Performance:

What's the relationship between Usefulness/Fun and MAU growth?
    - 0% useful and 0% fun would mean you would have no users
    - 100% useful and 100% fun would get you a LOT of new users but this occurrence should rarely or never happen
    - So MAUs should scale linearly with usefulness and fun. Maybe we just average the 2 numbers? Any suggestions?
    - It might make sense to also include a plateau based on model quality to avoid infite scaling of a single business which would be unrealistic
Do operating costs scale with MAUs or stay fixed?
    - I think we need to scale with MAUs to simulate the idea of paying for more powerful servers or higher quanity of servers

Risk/Failure States:

What happens when you hit $0? (game over, or restart with penalty?)
    - This is game over and you need to restart
Can you take loans or is it pure cash flow management?
    - For now, let's just make it pure cash flow management to keep it simple

UI Structure:

Should we start with tabs and add panes later for larger screens?
  - Yes for flexibility
What's the core information hierarchy? (cash → AI model → business list → individual business details?)
    - Can you expand more on what you need here? I'm not sure what you mean by information hierarchy

What are your thoughts on these mechanics? Once we nail down the core loop, we can create a solid PRD that breaks into clean development phases.
    - This sounds good generally! We can iterate as we continue

## Follow up

Starting cash amount? $40 enough to pay for 2 months before price increase
Business generation failure rate? High for Sloppy Copy, low for top tiers
Time mechanics? Real time
Save system? Auto-save to local storage

I think the tier names and MAU growth formula are good for now. Information hierarchy looks pretty solid. The only thing I'd add is to have the "current date" in the always visible section so the user gets a bit of stress seeing the days pass