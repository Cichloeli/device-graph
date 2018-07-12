import json

FILEINPUT   = '../graphOmahaIndexed.mtx_23_NUCLEI'
FILEOUTPUT  = '../data_files/density.json'

data = {}

# Open input file for read
with open(FILEINPUT, 'r') as fileinput:

    lines = fileinput.readlines()

    # Obtain the first and fifth entry
    for line in lines:

        entry = {}
        infoarray = line.split(' ')
        entry[infoarray[0]] = infoarray[4]

        data.update(entry)

fileinput.close()

# Open output file for write
with open(FILEOUTPUT, 'w') as fileoutput:

    json.dump(data, fileoutput, indent=4)

fileoutput.close()

