# search building sequences in dsp via backtrack

## Usage:
```
node main
```
or
```
node semi_search
```
auto yes
```
yes | node main > result.txt
```

## Reminder
A slightly difference between main.js and semi_search.js, main.js search a fixed building sequence first for all possible components arrangement, and then search buildling's next_permutation(). While semi_search.js recurse building and component together, so set ALLOWED_DUPL=["铁块"] and no input for quick search.
