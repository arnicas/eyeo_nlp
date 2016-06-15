
## Installation

Install miniconda for your platform here:

http://conda.pydata.org/miniconda.html

On a Mac, this requires you to download the (Python 2.7) .sh file, open a terminal window in your downloads folder, run `bin/sh [filename you downloaded.sh]`.  It should install the conda tool for you.

This is an environment tool that will allow you to protect your local installations, and create a virtual environment for the libraries needed for the class.  I taught it in Python 2.7.

### Console Window 1 of 2

Open a new console window.  This one should recognize the conda commands.

To download all the required libraries into a virtual env, do this:

````
>conda env create -f requirements.yml
````

This will install a boatload of libraries we need. Then, to use it, in a console window type:

````
>source activate textvis  [if you're on Windows, it's activate textvis]
````

Your cursor should change to show the environment is active:

````
(textvis)>
````

Before you try to do anything at the command line, make sure you do this in the console window:

````
(textkit)>export NLTK_DATA="[copy in the full path to the nltk data folder in this repo here]"
````

For instance, my path is `"/Users/lynn/Documents/My Talks and Courses/Eyeo-NLP/eyeo/eyeo_nlp/nltk_data".`


For any console windows you open and want to use textkit commands in, you'll need to make sure that env variable is set. Also for running textkit shell commands in the notebook. (Otherwise, you need to use the nltk downloader to get data files.  You can do that with nltk.download() in the Jyupter notebook.)

Now, you can cd into the python directory, and then type the notebook command:

````
(textkit)>cd python
(textkit)>jupyter notebook
````

If your notebook opens in a browser window, you are all set for the tutorial.  Leave the console window running as is, too!

### Console Window 2, for the Web Server

Open another console window. This one doesn't require the textkit env be activated, although it won't hurt.  You will want to start a web server in the root of this directory, too (not inside the web files!) using:

````
>python -m SimpleHTTPServer 8001
````

Leave that window running.  Navigate your web-browser to localhost:8001. Click on web.

You should now have 2 console windows with 2 processes running, one the web server and one the Notebook server. If you want another console window, feel free to open one.

**Make sure you activate the env and set the NLTK_DATA env variable if you plan to use textkit at the command line.**

When you want to shut down the python env, you use:

````
>source deactivate [just deactivate, on windows]
````

And you can ^c in the jupyter window and in the server window, to shut them down.

## Data Files

If you have data files to use, it's best if they are plain text, ideally ascii. You can put them into a directory inside "data".  There are tools to convert PDFs, but it's not part of this class.

## Addendum - For the Actual Class

I think we will have too many people downloading too many things if we do it at the start.  Let's all just make a small env for the basics before lunch.

````
>conda create --name tvis python=2 nltk jupyter
....say y to "proceed" and after that runs:
>source activate tvis
> pip install textkit
> cd python
> jupyter notebook
````

When we add to it for the afternoon, or if the internet seems fast, you will want to do this, inside the env:

````
>conda install matplotlib numpy scipy
and eventually
>conda install scikit-learn gensim pandas
````




