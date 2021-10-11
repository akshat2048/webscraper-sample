# Methodology

## Measured Statistics 

### Competitor Statistics

Total Prelim Wins at National Circuit Tournaments - W<sub>p</sub>

Total Prelims Losses at National Circuit Tournaments - L<sub>p</sub> 

Total Breaks - B

Total Tournaments - T

Total Outround Wins - W<sub>o</sub>

Total Outround Losses - L<sub>o</sub>

Total Number of Gold Bids - G

Total Number of Silver Bids - S

### Judge Statistics

Total Number of Judges - n<sub>judges</sub>

Individual Judge Scale Rating - JSR; -1 <= x <= 1; Perfectly Lay --> Perfectly Tech

## Caluculated Scores

PWS = Prelim Win Score = $\frac{W_p} {W_p + L_p}$

BR = Break Rate - $\frac{B}{T}$

OWR = Outround Win Rate - $\frac{W_o}{W_o + L_o}$

GBS = Gold Bid Score - $\frac{G}{2}$

SBS = Silver Bid Score - $\frac{S}{2}$

## Weight distribution

W<sub>PWS</sub> = 30%

W<sub>BR</sub> = 30%

W<sub>OWR</sub> = 20%

W<sub>GBS</sub> = 15%

W<sub>SBS</sub> = 5%

## Calculation of CDA Score (Comprehensive Debater Advantage)

CDA = W<sub>PWS</sub>(PWS) + W<sub>BR</sub>(BR) + W<sub>OWR</sub>(OWR) + W<sub>GBS</sub>(GBS) + 
W<sub>SBS</sub>(SBS)

## Calculation of CDA Average

CDA_Average = 1/n<sub>competitors</sub> * $\sum$ CDA

## Calculation of JPR (Judge Pool Rating) & JSR Distribution

JPR = 1/n<sub>judges</sub> * $\sum$ JSR 

## Calculation of T<sub>df</sub> (Tournament Difficulty Rating)

T<sub>df</sub> = $\frac{JPR + CDA_Average}{2}$