import json

FILEINPUT   = '../graphOmahaIndexed.mtx_23_NUCLEI'
FILEOUTPUT  = '../data_files/density.json'

data = {}

with open(FILEINPUT, 'r') as fileinput:

    lines = fileinput.readlines()

    for line in lines:

        entry = {}
        infoarray = line.split(' ')
        entry[infoarray[0]] = infoarray[4]

        data.update(entry)

fileinput.close()

with open(FILEOUTPUT, 'w') as fileoutput:

    json.dump(data, fileoutput, indent=4)

fileoutput.close()

