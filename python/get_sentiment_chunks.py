# Usage: python get_sentiment_chunks.py [filepath] [optional_chunk_size]

import json
import sys

NEGWORDS = "../data/sentiment_wordlists/negative-words.txt"
POSWORDS = "../data/sentiment_wordlists/positive-words.txt"

def load_words(path):
    with open(path) as handle:
        words = handle.readlines()
    words = [w.strip() for w in words if w[0] != ';']
    words = [word for word in words if word]  # get rid of empty string
    return words

negwords = load_words(NEGWORDS)
poswords = load_words(POSWORDS)

def read_lowercase(filename):
    """ Read and lowercase the text of the source file """
    with open(filename) as debate:
        text = debate.readlines()  # doesn't scale, should do with generator
        text = [t.lower() for t in text] # lowercase it all
        alltext = ' '.join(text)
    return alltext

def get_chunks(filetext, words=50):
    """ Breaks up the file into chunks of size words """
    from nltk import tokenize
    filewords = tokenize.word_tokenize(filetext)
    return [filewords[i:i+words] for i in xrange(0, len(filewords), words)]

def get_overlap(list1, list2):
    from collections import Counter
    list1_multiset = Counter(list1)
    list2_multiset = Counter(list2)
    overlap = list((list1_multiset & list2_multiset).elements())
    totals = []
    for word in overlap:
        totals.append((word, list1_multiset[word]))
    return totals

def get_sentiment_counts(chunks, poswords=poswords, negwords=negwords):
    from collections import Counter
    counts = []
    for i, chunk in enumerate(chunks):
        overlap_pos = get_overlap(chunk, poswords)
        overlap_neg = get_overlap(chunk, negwords)
        counts.append({
                "index": i,
                "pos": sum(Counter(dict(overlap_pos)).values()),
                "poswords": list(overlap_pos),
                "neg": sum(Counter(dict(overlap_neg)).values()),
                "negwords": list(overlap_neg),
                "words": len(chunk)
            })
    for count in counts:
        count['netpos'] = count['pos'] - count['neg']
    return counts

def main():
    if len(sys.argv) < 2:
        print 'Usage: python get_sentiment_chunks [filepath] {optional chunk size}'
        return
    input_file = sys.argv[1]
    if len(sys.argv) == 3:
        chunk_size = int(sys.argv[2])
    else:
        chunk_size = 50
    print "Using chunk size of: " + str(chunk_size)
    text = read_lowercase(input_file)
    chunks = get_chunks(text, words=chunk_size)
    jsonversion = json.dumps(get_sentiment_counts(chunks))
    with open('sentiment.json', 'w') as handle:
        handle.write(jsonversion)
    print "Writing out sentiment.json! Put it where your html can find it."

if __name__ == "__main__":
    main()

