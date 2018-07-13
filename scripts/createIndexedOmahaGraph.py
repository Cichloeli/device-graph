import json
inputFile=open('graphOmaha','r')
outputFile=open('graphOmahaIndexed.mtx','w')
outputFileDict = open('indexDict.json','w')

d={}
index = 1

for line in inputFile:
	words = line.split()
	if words[0] in d:
		if words[1] in d:
			wline = str(d[words[0]])+'\t'+str(d[words[1]])+'\n'
			outputFile.write(wline)
		else:
			d[words[1]] = index
			index = index + 1
			wline = str(d[words[0]])+'\t'+str(d[words[1]])+'\n'
			outputFile.write(wline)
	else:
		if words[1] in d:
			d[words[0]] = index
			index = index + 1
			wline = str(d[words[0]])+'\t'+str(d[words[1]])+'\n'
			outputFile.write(wline)
		else:
			d[words[0]] = index
			index = index + 1
			d[words[1]] = index
			index = index + 1
			wline = str(d[words[0]])+'\t'+str(d[words[1]])+'\n'
			outputFile.write(wline)

json = json.dumps(d)
outputFileDict.write(json)

inputFile.close()
outputFile.close()
outputFileDict.close()
