def matchRec(string, sub):
	if len(sub)==0:
		return True
	if len(string)==0:
		return False
	if string[0]==sub[0]:
		return matchRec(string[1:], sub[1:])
	else:
		return matchRec(string[1:], sub)

print matchRec("Duke", "Duke")
