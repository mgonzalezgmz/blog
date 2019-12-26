---
title: UK General Election 2019
link: https://projects.economist.com/uk-elections/2019/general-election-results
date: 2019-12-05
publisher: The Economist
video: assets/clips/uk-elections.mp4
coauthors: "[G. Elliot Morris](https://twitter.com/gelliottmorris), [Evan Hensleigh](https://twitter.com/futuraprime) and [James Fransham](https://twitter.com/jamesfransham)"
---

Our coverage of the UK general election was divided in two parts: a poll tracker and a result page. The [poll tracker](https://projects.economist.com/uk-elections/poll-tracker) was published weeks before the election and the result page had an interactive map and a live forecast.

For the poll tracker we had a R script running every morning on a AWS machine to generate new data. The main line chart uses a combination of Canvas, SVG and HTML as SVG clipping masks weren't fast enough.

The result page lets you slice the constituencies by Brexit vote, age, race, density and income. This was inspired by a [Times graphic from 2008](https://www.nytimes.com/elections/2008/results/president/explorer.html) (written in Flash). During the election night the [live forecast](https://projects.economist.com/uk-elections/2019/general-election-results#live-forecast) predicted the seat count well in advance of the final result. I designed the pages, implemented the frontend and programmed the graphics.
