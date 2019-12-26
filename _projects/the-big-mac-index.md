---
title: "The Big Mac index"
link: https://www.economist.com/news/2019/07/10/the-big-mac-index
date: 2018-07-11
publisher: The Economist
image: assets/images/big-mac.png
coauthors: "[Matt McLean](https://twitter.com/matterofmatt) and [Evan Hensleigh](https://twitter.com/futuraprime)"
---

The Big Mac index is the classic guide for currency comparison. It has been running on the paper since the 80s and as an interactive since 2012. Our redesign made it responsive and more explanatory. We did a long write up on [Source](https://source.opennews.org/articles/how-we-made-new-big-mac-index-interactive/) that goes into more detail, but this project took months from start to finish. We even launched a survey before starting the redesign and worked with UX designers from the group.

Matt designed everything in Illustrator and I programmed the graphics and the overall React app. Evan ported the calculations from a series of Excel spreadsheets to a [R script](https://github.com/TheEconomist/big-mac-data) and assisted with the transitions and a couple of bugs.

Dealing with currency was one of the hardest parts. The index includes 56, from the Euro to the Azerbaijani manat. For example, the exchange rate is usually calculated with a value of one to one (\$1 to €1), but for the Japanese yen it has to be ¥100 to €1, as ¥1 is too small (€0.01).
