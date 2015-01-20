print "TYPE 0 FOR SLOW"
input t
print "HOW MANY TERMS";
input  n

if t=0 then

t0 = time$("ms")
let p=0
for a= 1 to n
let p=p+4/(2*a-1)*(-1)^(a+1)
next a
t1 = time$("ms")
print "PI IS APPROXIMATELY "
print p
print "WHEN USING ";
print n ;
print " TERMS OF THE GREGORY-LEIBNIZ SERIES"
print "Elapsed time was "; (t1-t0)/1000; " seconds."

else
t0 = time$("ms")
let p=0
for a= 1 to n
let p=p+8/(4*a-3)/(4*a-1)
next a
t1 = time$("ms")
print "PI IS APPROXIMATELY "
print p
print "WHEN USING ";
print n ;
print " TERMS OF A FASTER SERIES"
print "Elapsed time was "; (t1-t0)/1000; " seconds."
end if

