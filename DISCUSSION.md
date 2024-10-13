# Discussion and Notes

Below are notes on how I approached this work, where my work diverges from a real world scenario due to the constraints of the exercise, and what I would do additionally given more time.

## Organization

The work is organized into [small, isolated pull requests](https://github.com/joshsaintjacque/solace-candidate-assignment/pulls?q=is:pr+is:closed), each tackling a specific issue. In order to facilitate these small PRs I've merged them as I went along. Ordinarily, of course, we would leave the PRs open pending review.

I recommend reviewing these PRs individually to see the changes I made and the reasoning behind them. You should be able to review them in any order, as each one will clearly state the before/after state of the application.

## Testing

Ordinarily each PR I create would include tests validating the changes I've made. However this project does not have testing infrastructure set up, so I'm excluding tests in order to stick to the time box.

## Performance

- Advocates are being fetched twice when loading the page, because mounting seems to be happening twice. I don't see an obvious cause of this since the useEffect dependency array is correct. It's possible this is default NextJS behavior in the local environment and hence not an issue in prod, but it is something I would investigate further given more time.
- We should probably move filtering to the server since client-side filtering may not scale well with a large number of advocates.
- Paginating the advocates list since it currently doesn't scale to a large number of advocates.
- There may be opportunities to use React.useMemo to prevent re-rendering. This seems like a minor concern given the small size of the app, but worth investigating if performance becomes an issue.
- On the server side, we could add caching to prevent repeated database queries.
- We should ensure the database is properly indexed, as well.

## UI/UX

Given more time I would extract more UI components, where styling is repeated, into shared components.

In the future we could extend the UX by:
- Adding drop down filters for the advocates list
- Sorting the advocates list by name, location, or other criteria
- Adding pagination since the list will become unworkable with large numbers of advocates


## Data Model

The advocate phoneNumber is being stored as a number, but it may benefit from being stored as a string or other more flexible data type.
