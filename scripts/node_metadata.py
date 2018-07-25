#creates json files for each node
import json
import os

NUCLIPATH = '../graphOmahaIndexed.mtx_23_NUCLEI'
CIRCLPATH = '../graphOmahaIndexed.mtx_23_circle.json'
INDEXPATH = '../indexRevDict.json'
OUTPATH   = '../data_files/nodes/'

def assure_path_exists(path):
        dir = os.path.dirname(path)
        if not os.path.exists(dir):
                os.makedirs(dir)

def openIndexFile():
    with open(INDEXPATH, 'r') as index_file:
        json_data = json.loads(index_file)
        index_file.close()

        return json_data

def openNucliFile():
    with open(NUCLIPATH, 'r') as nucli_file:
        lines = nucli_file.readlines()
        nucli_file.close()

        return lines

def createNodeFiles(index_data, nucli_data):

    assure_path_exists(OUTPATH)

    for line in nucli_data:
        line = line.split(' ')
        index = line[0]
        devices = line[7:-1]

        entry = {}
        dups = {}
        original_ids = []

        for device in devices:
            new = index_data[device]
            if new not in dups:
                original_ids.append(new)
                dups.update({new:0})

        if len(original_ids) > 10:
            entry[index] = original_ids

            file_name = OUTPATH + index + '.json'
            with open(file_name, 'w') as out_file:
                json.dump(entry, out_file)
                out_file.close()


def main():
    index_data = openIndexFile()
    nucli_data = openNucliFile()
    createNodeFiles(index_data, nucli_data)

if __name__ == '__main__':
    main()