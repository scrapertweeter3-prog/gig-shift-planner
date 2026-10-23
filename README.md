# Gig Shift Planner

A free browser tool for gig drivers: put two shifts side by side and see which
one really pays more per hour once tips, mileage cost, and unpaid dead time
are counted.

The number a gig app shows you is fare per paid minute. The number that pays
your bills is (pay + tips - car cost) divided by every minute you spent
earning it, including the ones at the curb. This planner does that division
for both shifts and calls the winner.

## The math

- Real take-home = fare + tips - (miles x your cost per mile)
- Real hourly = real take-home / (paid minutes + dead minutes) x 60

Car cost per mile defaults to 30 cents so the tool stays conservative; the
2026 IRS business standard mileage rate is 72.5 cents if you want the full
cost of ownership in the number.

## Run it

Open `index.html` in any browser, or serve the folder and visit it. No build,
no dependencies, no data leaves the page.

## Source facts

- IRS standard mileage rates: https://www.irs.gov/tax-professionals/standard-mileage-rates
- More receipts-first side hustle math: https://extrahustles.com

## License

MIT
