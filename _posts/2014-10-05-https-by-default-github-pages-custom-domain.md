---
layout: post
title: "How to enable HTTPS by default on Github Pages with a custom domain"
categories: articles
date: 2014-10-05
permalink: https-by-default-github-pages-custom-domain
---
Github enabled HTTPs [on Github Pages](https://konklone.com/post/github-pages-now-supports-https-so-use-it) last year. The problem? Custom domains were not accepted. We didn't have a solution until beginning of this week, when [Cloudflare](https://www.cloudflare.com/index.html) announced Universal SSL, an effort to have a  safer, more secure internet (for free, of course). 

This allows to have SSL enabled on Github Pages sites with a custom domain, like [this one](https://github.com/martgnz/martgnz.github.io).

## Please, do it
First, you have to create a [Cloudflare account](https://www.cloudflare.com/sign-up). Is easy to sign up, don't worry! The 'difficult' part is to modify your DNS on your domain registrar, but if you host your site on Github Pages I will assume that you are able to do it. Follow Cloudflare instructions (you need to point your nameservers to theirs) and then configure your preferred options (Cloudflare can minify your javascript and CSS, for example).

![Is easy to force HTTPS by default with Cloudflare](https://dl.dropboxusercontent.com/u/55065502/page-rules-https.png)

You have to enable SSL on the Cloudflare settings and wait for the activation (I had the message 'SSL issuing' for more than three days). The last part is to force HTTPS on all the pages. In order to do that, go to your 'Page Rules' and enable the option. Very easy!

## Why is this important?
SSL is a security layer over HTTP that prevents anyone to see the content of the pages you access to.  It prevents wiretapping and people like the NSA to know where do you navigate over the interwebs ([or maybe not](http://www.zdnet.com/has-the-nsa-broken-ssl-tls-aes-7000020312/)). 

Anyway, it's an encrypted barrier that is useful to prevent someone know your navigation habits and the requests you do on a certain site. This is even more relevant when you connect to public wifi networks, like the one in your airport. Google [has just announced](http://googlewebmastercentral.blogspot.com.es/2014/08/https-as-ranking-signal.html) that is going to improve the pagerank of the websites that have HTTPS, so that's another incentive.

I also recommend you to install [HTTPS Everywhere](https://www.eff.org/https-everywhere), an addon done by the EFF that forces your browser to access the HTTPS version of the page you're visiting.