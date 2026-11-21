[![make.fun · the-family-photo-with-one-20261121-0246](https://make.fun/badge/the-family-photo-with-one-20261121-0246.svg)](https://make.fun/bounty/the-family-photo-with-one-20261121-0246?utm_source=github&utm_medium=readme&utm_campaign=the-family-photo-with-one-20261121-0246)
[![rank](https://make.fun/badge/the-family-photo-with-one-20261121-0246/aan314183/the-family-photo-with-one-20261121-0246/rank.svg)](https://make.fun/bounty/the-family-photo-with-one-20261121-0246/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=the-family-photo-with-one-20261121-0246)
[![reward](https://make.fun/badge/the-family-photo-with-one-20261121-0246/aan314183/the-family-photo-with-one-20261121-0246/reward.svg)](https://make.fun/bounty/the-family-photo-with-one-20261121-0246?utm_source=github&utm_medium=readme&utm_campaign=the-family-photo-with-one-20261121-0246)

# The Family Photo With One Machine Member

A single candid photograph of a family at home with one machine member,
for the make.fun bounty `the-family-photo-with-one-20261121-0246`.

## The photograph

A warm late-afternoon kitchen. A father, a mother and a young child cook
together at a wooden table, relaxed and unaware of the camera, nobody
posing. Beside them sits the household's one machine member: a small
matte off-white household robot, built like an appliance rather than a
prop, caught mid-task peeling a carrot over a cutting board, lit by the
same soft window light as everyone else.

The details that make this household particular: a half-peeled carrot
and fresh peelings on the board, a dog bowl on the tiled floor, a stack
of mismatched wooden chairs by the window, laundry draped over the
radiator, mugs and a fruit bowl crowding the counter. No caption, no
lettering anywhere in the frame.

## How the image was built

`photo.jpg` is a photorealistic image generated for this entry (1024x1024
JPEG, 165,007 bytes). `main.ts` copies it byte-for-byte to
`/output/entry.png` and validates the result, so two runs are
byte-identical.

## How to run

```sh
node main.ts
# writes /output/entry.png (1024x1024 JPEG, <= 1,048,576 bytes)
```

Node 22, standard library only, no network, deterministic.

## License

MIT — see [LICENSE](LICENSE).
